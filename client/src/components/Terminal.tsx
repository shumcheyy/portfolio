import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTerminal } from '@/hooks/use-terminal';
import { Moon, Sun, Code, Minus, Plus } from 'lucide-react';

interface TerminalProps {
  isMinimized: boolean;
  onToggleMinimize: () => void;
  onScrollToSection: (id: string) => void;
  onToggleTheme: () => void;
  onToggleMatrix: () => void;
  onDownloadResume: () => void;
  isDark: boolean;
}

export function Terminal({
  isMinimized,
  onToggleMinimize,
  onScrollToSection,
  onToggleTheme,
  onToggleMatrix,
  onDownloadResume,
  isDark
}: TerminalProps) {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { entries, executeCommand, navigateHistory } = useTerminal(
    onScrollToSection,
    onToggleTheme,
    onToggleMatrix,
    onDownloadResume
  );

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [entries]);

  useEffect(() => {
    if (!isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isMinimized]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      executeCommand(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const historyCommand = navigateHistory('up');
      if (historyCommand !== null) {
        setInput(historyCommand);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const historyCommand = navigateHistory('down');
      if (historyCommand !== null) {
        setInput(historyCommand);
      }
    }
  };

  return (
    <div className={`terminal-bg text-terminal-green font-mono relative overflow-hidden transition-all duration-500 ease-in-out ${
      isMinimized ? 'terminal-minimized' : 'terminal-expanded'
    }`}>
      {/* Terminal Header */}
      <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-gray-300 text-sm ml-4">shubham@security-pro:~$</span>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleTheme}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleMatrix}
            className="text-gray-400 hover:text-terminal-green transition-colors p-1"
          >
            <Code className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleMinimize}
            className="text-gray-400 hover:text-white transition-colors p-1"
          >
            {isMinimized ? <Plus className="h-4 w-4" /> : <Minus className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Terminal Content */}
          <div className="p-4 h-full overflow-y-auto pb-16" ref={contentRef}>
            <div className="space-y-2">
              {entries.map((entry, index) => (
                <div key={index} className="whitespace-pre-line">
                  {entry.type === 'command' ? (
                    <div className="flex items-center">
                      <span className="terminal-amber">shubham@security-pro</span>
                      <span className="text-white">:</span>
                      <span className="terminal-blue">~</span>
                      <span className="text-white">$ </span>
                      <span className="terminal-green">{entry.content}</span>
                    </div>
                  ) : (
                    <div
                      className="text-white ml-0"
                      dangerouslySetInnerHTML={{ __html: entry.content }}
                    />
                  )}
                </div>
              ))}
              <div className="flex items-center">
                <span className="terminal-amber">shubham@security-pro</span>
                <span className="text-white">:</span>
                <span className="terminal-blue">~</span>
                <span className="text-white">$ </span>
                <span className="animate-blink">▋</span>
              </div>
            </div>
          </div>

          {/* Terminal Input */}
          <div className="absolute bottom-0 left-0 right-0 p-4 terminal-bg border-t border-gray-700">
            <form onSubmit={handleSubmit} className="flex items-center">
              <span className="terminal-amber">shubham@security-pro</span>
              <span className="text-white">:</span>
              <span className="terminal-blue">~</span>
              <span className="text-white">$ </span>
              <Input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-transparent border-none outline-none text-terminal-green flex-1 font-mono focus:ring-0 focus:border-transparent p-0 h-auto"
                autoComplete="off"
              />
            </form>
          </div>
        </>
      )}
    </div>
  );
}
