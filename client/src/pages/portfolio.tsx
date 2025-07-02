import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Terminal } from '@/components/Terminal';
import { ModernNav } from '@/components/ModernNav';
import { MatrixRain } from '@/components/MatrixRain';
import { HeroSection } from '@/components/HeroSection';
import { ExperienceTimeline } from '@/components/ExperienceTimeline';
import { SkillsGrid } from '@/components/SkillsGrid';
import { ProjectsGrid } from '@/components/ProjectsGrid';
import { ContactForm } from '@/components/ContactForm';
import { useTheme } from '@/components/ThemeProvider';

export default function Portfolio() {
  const [isTerminalMinimized, setIsTerminalMinimized] = useState(false);
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleTerminalMinimize = () => {
    setIsTerminalMinimized(!isTerminalMinimized);
  };

  const toggleMatrix = () => {
    setIsMatrixActive(!isMatrixActive);
  };

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

  // Keyboard shortcut for terminal toggle
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 font-sans">
      <title>Shubham Choubey - Security Professional | Portfolio</title>
      <meta name="description" content="Security Professional with 3+ years expertise in Network, Cloud and Web Application Security. Available for freelance security consulting." />
      
      {/* Matrix Rain Effect */}
      <MatrixRain isActive={isMatrixActive} />
      
      {/* Terminal Section */}
      <Terminal
        isMinimized={isTerminalMinimized}
        onToggleMinimize={toggleTerminalMinimize}
        onScrollToSection={scrollToSection}
        onToggleTheme={toggleTheme}
        onToggleMatrix={toggleMatrix}
        onDownloadResume={downloadResume}
        isDark={theme === 'dark'}
      />
      
      {/* Modern Navigation (shown when terminal minimized) */}
      <ModernNav 
        isVisible={isTerminalMinimized} 
        onScrollToSection={scrollToSection}
      />
      
      {/* Main Content Area */}
      <div className={`overflow-y-auto transition-all duration-500 ease-in-out ${
        isTerminalMinimized ? 'content-terminal-minimized' : 'content-terminal-expanded'
      }`}>
        <div className="container mx-auto px-4 py-8 space-y-12">
          <HeroSection />
          <ExperienceTimeline />
          <SkillsGrid />
          <ProjectsGrid />
          <ContactForm />
        </div>
      </div>
      
      {/* Resume Download Button */}
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
