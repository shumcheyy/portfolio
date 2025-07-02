import { Briefcase, Shield, Laptop, Building, Globe } from 'lucide-react';

export function ExperienceTimeline() {
  return (
    <section id="experience" className="animate-fadeIn">
      <div className="glassmorphism rounded-2xl p-8">
        <div className="flex items-center space-x-3 mb-8">
          <Briefcase className="w-8 h-8 text-green-600 dark:text-green-400" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Professional Experience</h2>
        </div>
        
        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-green-600"></div>
          
          {/* EVIDEN */}
          <div className="relative flex items-start space-x-8 mb-12">
            <div className="flex-shrink-0 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              <Shield className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <div className="glassmorphism rounded-lg p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Associate Engineer</h3>
                  <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                    <Building className="w-4 h-4 mr-2" />
                    EVIDEN | Bengaluru, KA
                  </div>
                </div>
                <p className="text-sm text-blue-600 dark:text-blue-400 mb-4">September 2021 - Feb 2025</p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Conducted vulnerability assessments and penetration tests utilizing both SAST and DAST methodologies, identifying critical and high-risk vulnerabilities in 95% of engagements</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Performed threat analysis and PCI DSS compliance assessments, including ASV scans, reducing security-related incidents by 30% for Fintech and Telecom clients</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Reviewed AWS cloud architecture security controls and collaborated with development teams to integrate security into SDLC</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Freelancer */}
          <div className="relative flex items-start space-x-8">
            <div className="flex-shrink-0 w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white font-bold">
              <Laptop className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <div className="glassmorphism rounded-lg p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Freelance Security Consultant</h3>
                  <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                    <Globe className="w-4 h-4 mr-2" />
                    Remote
                  </div>
                </div>
                <p className="text-sm text-green-600 dark:text-green-400 mb-4">January 2020 - August 2021</p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Conducted web application security assessments and threat modeling, reducing high-risk security vulnerabilities by 40% for diverse clients</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Developed and executed various payloads to identify vulnerabilities in accordance with the OWASP Top 10</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>Utilized security testing tools including BurpSuite, ZAP, and manual testing to identify and remediate security flaws</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
