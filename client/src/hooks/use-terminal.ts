import { useState, useCallback } from 'react';
import { createTerminalCommands } from '@/lib/terminal-commands';

export interface TerminalEntry {
  type: 'command' | 'output';
  content: string;
  timestamp: Date;
}

// PROMPT is the text shown before each command, like in a real terminal.
const PROMPT = "shubham@security";

// This custom hook manages the state and logic for the terminal window.
// It keeps track of command history, output, and provides functions to interact with the terminal.
export const useTerminal = (
  scrollToSection: (id: string) => void, // Function to scroll to a section of the page
  toggleTheme: () => void, // Function to switch between dark/light mode
  toggleMatrix: () => void, // Function to toggle the Matrix rain effect
  downloadResume: () => void // Function to download the resume
) => {
  // entries: all the lines (commands and outputs) shown in the terminal
  const [entries, setEntries] = useState<TerminalEntry[]>([
    {
      type: 'output',
      // This is the first message shown in the terminal when the page loads
      content: `<div class="flex items-center">
        <span class="terminal-amber">${PROMPT}</span>
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
  
  // commandHistory: stores all commands the user has typed
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  // historyIndex: used to navigate command history with up/down arrows
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Clears all terminal output
  const clearTerminal = useCallback(() => {
    setEntries([]);
  }, []);

  // Shows the command history as output
  const showHistory = useCallback(() => {
    if (commandHistory.length === 0) {
      return '<span class="text-gray-400">No command history available.</span>';
    }
    return `<span class="terminal-green">Command History:</span>\n${commandHistory.map((cmd, i) => `${i + 1}. ${cmd}`).join('\n')}`;
  }, [commandHistory]);

  // createTerminalCommands returns all available terminal commands
  const commands = createTerminalCommands(
    scrollToSection,
    toggleTheme,
    toggleMatrix,
    downloadResume,
    clearTerminal,
    showHistory
  );

  // Executes a command typed by the user
  const executeCommand = (input: string) => {
    const trimmed = input.trim();
    if (!trimmed) return;
    // Add the command to the terminal entries
    setEntries((prev) => [
      ...prev,
      { type: 'command', content: trimmed, timestamp: new Date() },
      // Add the output from the command
      { type: 'output', content: commands[trimmed]?.execute() ?? `<span class="terminal-red">Command not found: ${trimmed}</span>`, timestamp: new Date() }
    ]);
    // Add the command to history
    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);
  };

  // Lets user navigate command history with up/down arrows
  const navigateHistory = (direction: 'up' | 'down') => {
    if (commandHistory.length === 0) return null;
    let newIndex = historyIndex;
    if (direction === 'up') {
      newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
    } else {
      newIndex = historyIndex === -1 ? -1 : Math.min(commandHistory.length - 1, historyIndex + 1);
    }
    setHistoryIndex(newIndex);
    return newIndex === -1 ? '' : commandHistory[newIndex];
  };

  // Return everything needed for the terminal component
  return {
    entries,
    executeCommand,
    navigateHistory,
    commands: Object.keys(commands)
  };
};
