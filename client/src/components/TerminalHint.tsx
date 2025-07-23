import { useState, useEffect } from 'react';
import { Terminal, X } from 'lucide-react';

interface TerminalHintProps {
  isTerminalMinimized: boolean;
}

export function TerminalHint({ isTerminalMinimized }: TerminalHintProps) {
  const [showHint, setShowHint] = useState(false);
  const [hasSeenHint, setHasSeenHint] = useState(false);

  useEffect(() => {
    // Check if user has seen the hint before
    const hasSeenBefore = localStorage.getItem('terminal-hint-seen');
    
    if (!hasSeenBefore && isTerminalMinimized) {
      // Show hint after 2 seconds if terminal is minimized and user hasn't seen it
      const timer = setTimeout(() => {
        setShowHint(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isTerminalMinimized]);

  const dismissHint = () => {
    setShowHint(false);
    setHasSeenHint(true);
    localStorage.setItem('terminal-hint-seen', 'true');
  };

  // Auto-dismiss after 8 seconds
  useEffect(() => {
    if (showHint) {
      const timer = setTimeout(() => {
        dismissHint();
      }, 8000);
      
      return () => clearTimeout(timer);
    }
  }, [showHint]);

  if (!showHint || !isTerminalMinimized || hasSeenHint) {
    return null;
  }

  return (
    <div className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50 animate-fadeIn">
      <div className="bg-gray-900 border border-green-500 rounded-lg p-4 shadow-lg max-w-sm">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <Terminal className="h-5 w-5 text-green-400 mt-0.5" />
          </div>
          <div className="flex-1">
            <p className="text-white text-sm font-medium">
              Interactive Terminal Available!
            </p>
            <p className="text-gray-300 text-xs mt-1">
              Click the terminal bar above or press <kbd className="px-1 py-0.5 bg-gray-700 rounded text-xs">Ctrl + `</kbd> to explore
            </p>
          </div>
          <button
            onClick={dismissHint}
            className="flex-shrink-0 text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        {/* Arrow pointing up to terminal */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-4 border-l-transparent border-r-transparent border-b-green-500"></div>
        </div>
      </div>
    </div>
  );
}