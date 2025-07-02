import { ShieldQuestion, MapPin, Mail, Phone } from 'lucide-react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

export function HeroSection() {
  return (
    <section id="about" className="animate-fadeIn">
      <div className="glassmorphism rounded-2xl p-8">
        <div className="flex items-center space-x-3 mb-6">
          <ShieldQuestion className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">About Me</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              Security Professional with 3+ years of expertise in Network, Cloud and Web Application Security. 
              Adept at uncovering critical security flaws through manual and automated techniques across diverse IT environments.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Proven track record of delivering actionable insights that translate technical findings into business impact. 
              Committed to staying ahead of emerging threats and evolving exploitation methods.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-gray-700 dark:text-gray-300">Bengaluru, Karnataka</span>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-gray-700 dark:text-gray-300">bhamchoubey@protonmail.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span className="text-gray-700 dark:text-gray-300">+919589426407</span>
            </div>
            <div className="flex space-x-4 mt-6">
              <a 
                href="https://linkedin.com/in/shubham-choubey" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
              <a 
                href="https://github.com/shubham-choubey" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                <FaGithub className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
