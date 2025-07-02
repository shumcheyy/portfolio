import { useEffect, useRef, useState } from 'react';
import { Code, Bug, Search, Network, Shield, ShieldQuestion } from 'lucide-react';
import { FaDocker, FaAws, FaPython, FaLinux } from 'react-icons/fa';
import { SiTerraform, SiKubernetes, SiSonarqube, SiGo } from 'react-icons/si';

interface SkillBarProps {
  name: string;
  percentage: number;
  color: string;
  inView: boolean;
}

function SkillBar({ name, percentage, color, inView }: SkillBarProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-700 dark:text-gray-300">{name}</span>
        <span className="text-sm text-gray-600 dark:text-gray-400">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div 
          className={`progress-bar h-2 rounded-full ${color}`}
          style={{ width: inView ? `${percentage}%` : '0%' }}
        ></div>
      </div>
    </div>
  );
}

export function SkillsGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const securitySkills = [
    { name: 'Penetration Testing', percentage: 95, color: 'bg-gradient-to-r from-red-500 to-red-600' },
    { name: 'Vulnerability Assessment', percentage: 90, color: 'bg-gradient-to-r from-orange-500 to-orange-600' },
    { name: 'Cloud Security', percentage: 85, color: 'bg-gradient-to-r from-blue-500 to-blue-600' },
    { name: 'DevSecOps', percentage: 80, color: 'bg-gradient-to-r from-green-500 to-green-600' }
  ];

  const programmingSkills = [
    { name: 'Python', percentage: 85, color: 'bg-gradient-to-r from-yellow-500 to-yellow-600' },
    { name: 'Golang', percentage: 75, color: 'bg-gradient-to-r from-cyan-500 to-cyan-600' },
    { name: 'Bash Scripting', percentage: 80, color: 'bg-gradient-to-r from-gray-500 to-gray-600' }
  ];

  const tools = [
    { name: 'BurpSuite', icon: Bug, color: 'text-red-500' },
    { name: 'SonarQube', icon: Search, color: 'text-blue-500' },
    { name: 'Nmap', icon: Network, color: 'text-green-500' },
    { name: 'Docker', icon: FaDocker, color: 'text-blue-400' },
    { name: 'Terraform', icon: SiTerraform, color: 'text-purple-500' },
    { name: 'Kubernetes', icon: SiKubernetes, color: 'text-blue-600' }
  ];

  return (
    <section ref={sectionRef} id="skills" className="animate-fadeIn">
      <div className="glassmorphism rounded-2xl p-8">
        <div className="flex items-center space-x-3 mb-8">
          <Code className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Technical Skills</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Security Skills */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Security Skills</h3>
            <div className="space-y-4">
              {securitySkills.map((skill) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  percentage={skill.percentage}
                  color={skill.color}
                  inView={inView}
                />
              ))}
            </div>
          </div>
          
          {/* Tools */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Security Tools</h3>
            <div className="space-y-3">
              {tools.map((tool) => {
                const IconComponent = tool.icon;
                return (
                  <div key={tool.name} className="flex items-center space-x-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <IconComponent className={`w-5 h-5 ${tool.color}`} />
                    <span className="text-gray-700 dark:text-gray-300">{tool.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
          
          {/* Programming */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Programming</h3>
            <div className="space-y-4">
              {programmingSkills.map((skill) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  percentage={skill.percentage}
                  color={skill.color}
                  inView={inView}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
