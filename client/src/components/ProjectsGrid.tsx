import { ChartGantt, Tag, CloudCog, ExternalLink, Shield, Network } from 'lucide-react';
import { FaGithub, FaAws, FaMicrosoft } from 'react-icons/fa';
import { SiTerraform, SiGithubactions, SiSonarqube } from 'react-icons/si';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function ProjectsGrid() {
  const projects = [
    {
      title: 'Cloud Security Automation',
      description: 'Designed and implemented CI/CD pipelines using Github Actions and Terraform to automate AWS infrastructure deployment, integrating SonarQube for static code analysis to enforce secure coding standards and enhance DevSecOps workflows.',
      technologies: ['AWS', 'Terraform', 'GitHub Actions', 'SonarQube'],
      techColors: ['bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200', 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200', 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200', 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'],
      githubUrl: '#',
      liveUrl: '#'
    }
  ];

  const certifications = [
    { name: 'AWS Solutions Architect', issuer: 'Amazon Web Services', icon: FaAws, color: 'text-orange-500' },
    { name: 'MS AZ-900', issuer: 'Microsoft Azure Fundamentals', icon: FaMicrosoft, color: 'text-blue-500' },
    { name: 'Qualys VM Specialist', issuer: 'Vulnerability Management', icon: Shield, color: 'text-green-500' },
    { name: 'CCNA - R&S', issuer: 'Cisco (Expired)', icon: Network, color: 'text-red-500' }
  ];

  return (
    <section id="projects" className="animate-fadeIn">
      <div className="glassmorphism rounded-2xl p-8">
        <div className="flex items-center space-x-3 mb-8">
          <ChartGantt className="w-8 h-8 text-red-600 dark:text-red-400" />
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Projects & Certifications</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Projects */}
          {projects.map((project, index) => (
            <div key={index} className="glassmorphism rounded-xl p-6 hover:scale-105 transition-transform duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <CloudCog className="w-6 h-6 text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{project.title}</h3>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, techIndex) => (
                  <Badge key={tech} variant="secondary" className={project.techColors[techIndex]}>
                    {tech}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                    <FaGithub className="w-4 h-4 mr-2" />
                    View Code
                  </a>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </a>
                </Button>
              </div>
            </div>
          ))}
          
          {/* Certifications */}
          <div className="glassmorphism rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Tag className="w-6 h-6 text-yellow-600" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Certifications</h3>
            </div>
            <div className="space-y-3">
              {certifications.map((cert, index) => {
                const IconComponent = cert.icon;
                return (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <IconComponent className={`w-6 h-6 ${cert.color}`} />
                    <div>
                      <p className="text-gray-900 dark:text-white font-medium">{cert.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{cert.issuer}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
