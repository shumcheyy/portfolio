import { useState, useCallback } from 'react';
import { createTerminalCommands } from '@/lib/terminal-commands';

export interface TerminalEntry {
  type: 'command' | 'output';
  content: string;
  timestamp: Date;
}

export const useTerminal = (
  scrollToSection: (id: string) => void,
  toggleTheme: () => void,
  toggleMatrix: () => void,
  downloadResume: () => void
) => {
  const [entries, setEntries] = useState<TerminalEntry[]>([
    {
      type: 'output',
      content: `<div class="flex items-center">
        <span class="terminal-amber">shubham@security-pro</span>
        <span class="text-white">:</span>
        <span class="terminal-blue">~</span>
        <span class="text-white">$ </span>
        <span class="terminal-green">whoami</span>
      </div>
      <div class="text-white ml-0">
        <p>Security Professional | Penetration Tester | Cloud Security Expert</p>
        <p class="text-gray-400">Type 'help' for available commands</p>
      </div>`,
      timestamp: new Date()
    }
  ]);
  
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const clearTerminal = useCallback(() => {
    setEntries([]);
  }, []);

  const showHistory = useCallback(() => {
    if (commandHistory.length === 0) {
      return '<span class="text-gray-400">No command history available.</span>';
    }
    return `<span class="terminal-green">Command History:</span>\n${commandHistory.map((cmd, i) => `${i + 1}. ${cmd}`).join('\n')}`;
  }, [commandHistory]);

  const commands = createTerminalCommands(
    scrollToSection,
    toggleTheme,
    toggleMatrix,
    downloadResume,
    clearTerminal,
    showHistory
  );

  const executeCommand = useCallback((input: string) => {
    const command = input.trim().toLowerCase();
    
    // Add command to entries
    setEntries(prev => [...prev, {
      type: 'command',
      content: command,
      timestamp: new Date()
    }]);

    // Add to history
    if (command && !commandHistory.includes(command)) {
      setCommandHistory(prev => [...prev, command]);
    }
    setHistoryIndex(-1);

    // Execute command
    if (commands[command]) {
      const output = commands[command].execute();
      if (output) {
        setEntries(prev => [...prev, {
          type: 'output',
          content: output,
          timestamp: new Date()
        }]);
      }
    } else if (command) {
      setEntries(prev => [...prev, {
        type: 'output',
        content: `<span class="terminal-red">Command not found: ${command}</span>\nType <span class="terminal-amber">'help'</span> for available commands.`,
        timestamp: new Date()
      }]);
    }
  }, [commands, commandHistory]);

  const navigateHistory = useCallback((direction: 'up' | 'down') => {
    if (direction === 'up' && historyIndex < commandHistory.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      return commandHistory[commandHistory.length - 1 - newIndex];
    } else if (direction === 'down' && historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      return commandHistory[commandHistory.length - 1 - newIndex];
    } else if (direction === 'down' && historyIndex === 0) {
      setHistoryIndex(-1);
      return '';
    }
    return null;
  }, [commandHistory, historyIndex]);

  return {
    entries,
    executeCommand,
    navigateHistory,
    commands: Object.keys(commands)
  };
};
