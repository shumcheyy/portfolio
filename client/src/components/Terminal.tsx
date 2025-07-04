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

// PROMPT is the text shown before each command, like in a real terminal.
const PROMPT = "shubham@security";

// This is the main Terminal component. It shows a fake terminal window where users can type commands and see output.
// It can be minimized, resized, and interacts with the rest of the portfolio.

export function Terminal({
  isMinimized, // Whether the terminal is minimized (small bar) or open
  onToggleMinimize, // Function to minimize/maximize the terminal
  onScrollToSection, // Function to scroll to a section of the page
  onToggleTheme, // Function to switch between dark/light mode
  onToggleMatrix, // Function to toggle the Matrix rain effect
  onDownloadResume, // Function to download the resume
  isDark // Whether the current theme is dark
}: TerminalProps) {
  // input: what the user is typing
  const [input, setInput] = useState('');
  // inputRef: lets us focus the input box automatically
  const inputRef = useRef<HTMLInputElement>(null);
  // contentRef: lets us scroll the terminal content to the bottom
  const contentRef = useRef<HTMLDivElement>(null);

  // useTerminal is a custom hook that manages terminal history, commands, etc.
  const { entries, executeCommand, navigateHistory } = useTerminal(
    onScrollToSection,
    onToggleTheme,
    onToggleMatrix,
    onDownloadResume
  );

  // State and logic for resizing the terminal by dragging
  const [height, setHeight] = useState(40); // Terminal height in vh (viewport height)
  const isResizing = useRef(false); // Are we currently dragging to resize?
  const startY = useRef(0); // Where did the drag start (Y position)?
  const startHeight = useRef(40); // What was the height when drag started?

  // When user starts dragging the resize handle
  const handleMouseDown = (e: React.MouseEvent) => {
    isResizing.current = true;
    startY.current = e.clientY;
    startHeight.current = height;
    document.body.style.cursor = 'ns-resize'; // Change cursor to resize
  };

  // Listen for mouse move/up events to resize the terminal
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing.current) return;
      const diff = e.clientY - startY.current;
      let newHeight = startHeight.current + (diff * 100 / window.innerHeight);
      newHeight = Math.max(20, Math.min(newHeight, 80)); // Clamp height between 20vh and 80vh
      setHeight(newHeight);
    };
    const handleMouseUp = () => {
      isResizing.current = false;
      document.body.style.cursor = '';
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [height]);

  // Scroll terminal to bottom when new output is added
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [entries]);

  // Focus the input box when terminal is open
  useEffect(() => {
    if (!isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isMinimized]);

  // When user submits a command (presses Enter)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      executeCommand(input); // Run the command
      setInput(''); // Clear the input box
    }
  };

  // Handle up/down arrow keys to navigate command history
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

  // Render the terminal window
  return (
    <div
      className={`terminal-bg text-terminal-green font-mono relative overflow-hidden transition-all duration-500 ease-in-out ${isMinimized ? 'terminal-minimized' : ''}`}
      style={!isMinimized ? { height: `${height}vh` } : {}}
    >
      {/* Terminal Header: shows fake window controls and prompt */}
      <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          {/* Fake window control dots */}
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          {/* The prompt label */}
          <span className="text-gray-300 text-sm ml-4">{PROMPT}:~$</span>
        </div>
        {/* Terminal control buttons: theme, matrix, minimize */}
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

      {/* Only show the terminal content and input if not minimized */}
      {!isMinimized && (
        <>
          {/* Terminal Content: shows command history and output */}
          <div className="p-4" style={{ height: `calc(${height}vh - 64px - 48px)` , overflowY: 'auto', paddingBottom: '4rem' }} ref={contentRef}>
            <div className="space-y-2">
              {/* Loop through all terminal entries (commands and outputs) */}
              {entries.map((entry, index) => (
                <div key={index} className="whitespace-pre-line">
                  {entry.type === 'command' ? (
                    // Show the prompt and the command typed by the user
                    <div className="flex items-center">
                      <span className="terminal-amber">{PROMPT}</span>
                      <span className="text-white">:</span>
                      <span className="terminal-blue">~</span>
                      <span className="text-white">$ </span>
                      <span className="terminal-green font-semibold">{entry.content}</span>
                    </div>
                  ) : (
                    // Show the output from the command
                    <div
                      className="terminal-output-entry bg-gray-800/60 rounded px-3 py-2 mt-1 text-white border-l-4 border-terminal-green"
                      dangerouslySetInnerHTML={{ __html: entry.content }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* Resize Handle: drag to change terminal height */}
          <div
            className="w-full h-3 cursor-ns-resize bg-gray-700 hover:bg-gray-600 transition-colors absolute left-0"
            style={{ bottom: '48px' }}
            onMouseDown={handleMouseDown}
          />
          {/* Terminal Input: where user types commands */}
          <div className="absolute bottom-0 left-0 right-0 p-4 terminal-bg border-t border-gray-700">
            <form onSubmit={handleSubmit} className="flex items-center">
              <span className="terminal-amber">{PROMPT}</span>
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
