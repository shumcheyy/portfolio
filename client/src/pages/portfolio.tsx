import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Terminal } from '@/components/Terminal';
import { ModernNav } from '@/components/ModernNav';
import { MatrixRain } from '@/components/MatrixRain';
import { TerminalHint } from '@/components/TerminalHint';
import { HeroSection } from '@/components/HeroSection';
import { ExperienceTimeline } from '@/components/ExperienceTimeline';
import { SkillsGrid } from '@/components/SkillsGrid';
import { ProjectsGrid } from '@/components/ProjectsGrid';
import { ContactForm } from '@/components/ContactForm';
import { useTheme } from '@/components/ThemeProvider';

// This is the main page for the portfolio. It puts together the terminal, navigation, and all the main content sections.
export default function Portfolio() {
  // State to track if the terminal is minimized (small bar) or open
  const [isTerminalMinimized, setIsTerminalMinimized] = useState(true);
  // State to track if the Matrix rain effect is active
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  // Get the current theme and a function to toggle it
  const { theme, toggleTheme } = useTheme();

  // This function scrolls to a section of the page by its id
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // This toggles the terminal between minimized and open
  const toggleTerminalMinimize = () => {
    setIsTerminalMinimized(!isTerminalMinimized);
  };

  // This toggles the Matrix rain effect
  const toggleMatrix = () => {
    setIsMatrixActive(!isMatrixActive);
  };

  // This triggers a download of the resume PDF
  const downloadResume = () => {
    // Create a temporary link to trigger download
    // In a real implementation, this would point to an actual PDF file
    const link = document.createElement('a');
    link.href = '/resume-shubham-choubey.pdf'; // This would be the actual resume file
    link.download = 'Shubham_Choubey_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Keyboard shortcut: Ctrl + ` toggles the terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === '`') {
        e.preventDefault();
        toggleTerminalMinimize();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // The layout uses flex column: terminal at the top, content below
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 font-sans flex flex-col">
      <title>Shubham Choubey - Security Professional | Portfolio</title>
      <meta name="description" content="Security Professional with 3+ years expertise in Network, Cloud and Web Application Security. Available for freelance security consulting." />
      
      {/* Matrix Rain Effect overlays the page if active */}
      <MatrixRain isActive={isMatrixActive} />
      
      {/* Terminal hint for first-time visitors */}
      <TerminalHint isTerminalMinimized={isTerminalMinimized} />
      
      {/* Terminal Section at the top */}
      <Terminal
        isMinimized={isTerminalMinimized}
        onToggleMinimize={toggleTerminalMinimize}
        onScrollToSection={scrollToSection}
        onToggleTheme={toggleTheme}
        onToggleMatrix={toggleMatrix}
        onDownloadResume={downloadResume}
        isDark={theme === 'dark'}
      />
      
      {/* Modern Navigation bar, only shown when terminal is minimized */}
      <ModernNav 
        isVisible={isTerminalMinimized} 
        onScrollToSection={scrollToSection}
      />
      
      {/* Main Content Area: grows to fill the rest of the page */}
      <div className="flex-grow overflow-y-auto transition-all duration-500 ease-in-out">
        <div className="container mx-auto px-4 py-8 space-y-12">
          {/* Each section is a separate component */}
          <HeroSection />
          <ExperienceTimeline />
          <SkillsGrid />
          <ProjectsGrid />
          <ContactForm />
        </div>
      </div>
      
      {/* Resume Download Button: fixed in the bottom right corner */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={downloadResume}
          className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
          size="lg"
        >
          <Download className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
