export interface TerminalCommand {
  name: string;
  description: string;
  execute: () => string;
}

export const createTerminalCommands = (
  scrollToSection: (id: string) => void,
  toggleTheme: () => void,
  toggleMatrix: () => void,
  downloadResume: () => void,
  clearTerminal: () => void,
  showHistory: () => string
): Record<string, TerminalCommand> => ({
  help: {
    name: 'help',
    description: 'Show available commands',
    execute: () => `Available commands:
<span class="terminal-amber">about</span>      - Learn about me
<span class="terminal-amber">experience</span> - View my work history
<span class="terminal-amber">skills</span>     - List technical skills
<span class="terminal-amber">projects</span>   - Show my projects
<span class="terminal-amber">contact</span>    - Get in touch
<span class="terminal-amber">resume</span>     - Download my resume
<span class="terminal-amber">theme</span>      - Toggle dark/light mode
<span class="terminal-amber">matrix</span>     - Toggle matrix rain effect
<span class="terminal-amber">whoami</span>     - Display user info
<span class="terminal-amber">clear</span>      - Clear terminal
<span class="terminal-amber">history</span>    - Show command history

<span class="terminal-green">Security Easter Eggs:</span>
<span class="terminal-amber">scan</span>       - Run network scan
<span class="terminal-amber">exploit</span>    - Check for vulnerabilities
<span class="terminal-amber">secure</span>     - Secure the system`
  },

  about: {
    name: 'about',
    description: 'Learn about me',
    execute: () => {
      scrollToSection('about');
      return `<span class="terminal-green">Security Professional | Penetration Tester | Cloud Security Expert</span>

I'm a passionate security professional with 3+ years of expertise in:
• Network, Cloud and Web Application Security
• Penetration Testing and Vulnerability Assessments
• DevSecOps and Secure Development Practices

Currently based in Bengaluru, Karnataka, and available for freelance consulting.`;
    }
  },

  experience: {
    name: 'experience',
    description: 'View my work history',
    execute: () => {
      scrollToSection('experience');
      return `<span class="terminal-green">Professional Experience:</span>

<span class="terminal-amber">EVIDEN</span> - Associate Engineer (Sept 2021 - Feb 2025)
• Vulnerability assessments and penetration testing
• Cloud security architecture reviews
• DevSecOps integration and SDLC security

<span class="terminal-amber">Freelance</span> - Security Consultant (Jan 2020 - Aug 2021)
• Web application security assessments
• OWASP Top 10 compliance testing
• Security tool implementation`;
    }
  },

  skills: {
    name: 'skills',
    description: 'List technical skills',
    execute: () => {
      scrollToSection('skills');
      return `<span class="terminal-green">Technical Skills:</span>

<span class="terminal-amber">Security:</span> Penetration Testing, Vulnerability Assessment, Cloud Security, DevSecOps
<span class="terminal-amber">Tools:</span> BurpSuite, SonarQube, Nmap, Docker, Kubernetes, Terraform
<span class="terminal-amber">Languages:</span> Python, Golang, Bash
<span class="terminal-amber">Cloud:</span> AWS, Azure, CI/CD Pipelines
<span class="terminal-amber">Certifications:</span> AWS Solutions Architect, MS AZ-900, Qualys VM Specialist`;
    }
  },

  projects: {
    name: 'projects',
    description: 'Show my projects',
    execute: () => {
      scrollToSection('projects');
      return `<span class="terminal-green">Featured Projects:</span>

<span class="terminal-amber">Cloud Security Automation</span>
Designed CI/CD pipelines with GitHub Actions and Terraform for automated AWS infrastructure deployment with SonarQube integration.

<span class="terminal-amber">Security Assessment Framework</span>
Built comprehensive security testing framework using Python and various security tools for automated vulnerability detection.`;
    }
  },

  contact: {
    name: 'contact',
    description: 'Get in touch',
    execute: () => {
      scrollToSection('contact');
      return `<span class="terminal-green">Get In Touch:</span>

<span class="terminal-amber">Email:</span> bhamchoubey@protonmail.com
<span class="terminal-amber">Phone:</span> +91 9589426407
<span class="terminal-amber">Location:</span> Bengaluru, Karnataka
<span class="terminal-amber">LinkedIn:</span> linkedin.com/in/shubham-choubey
<span class="terminal-amber">GitHub:</span> github.com/shubham-choubey

Available for freelance security consulting and penetration testing projects.`;
    }
  },

  resume: {
    name: 'resume',
    description: 'Download my resume',
    execute: () => {
      downloadResume();
      return `<span class="terminal-green">Preparing resume download...</span>
<span class="terminal-amber">Download will start in 3 seconds...</span>`;
    }
  },

  whoami: {
    name: 'whoami',
    description: 'Display user info',
    execute: () => `<span class="terminal-green">shubham</span>
Security Professional with expertise in penetration testing, cloud security, and DevSecOps.
Type <span class="terminal-amber">'help'</span> for available commands.`
  },

  clear: {
    name: 'clear',
    description: 'Clear terminal',
    execute: () => {
      clearTerminal();
      return '';
    }
  },

  history: {
    name: 'history',
    description: 'Show command history',
    execute: showHistory
  },

  theme: {
    name: 'theme',
    description: 'Toggle dark/light mode',
    execute: () => {
      toggleTheme();
      return '<span class="terminal-green">Theme toggled successfully!</span>';
    }
  },

  matrix: {
    name: 'matrix',
    description: 'Toggle matrix rain effect',
    execute: () => {
      toggleMatrix();
      return '<span class="terminal-green">Matrix effect toggled!</span>';
    }
  },

  // Security Easter Eggs
  scan: {
    name: 'scan',
    description: 'Run network scan',
    execute: () => `<span class="terminal-green">Starting Nmap scan...</span>
<span class="text-gray-400">TARGET: localhost</span>
<span class="text-gray-400">Starting Nmap 7.93 ( https://nmap.org )</span>
<span class="terminal-green">PORT     STATE    SERVICE</span>
<span class="text-white">22/tcp   open     ssh</span>
<span class="text-white">80/tcp   open     http</span>
<span class="text-white">443/tcp  open     https</span>
<span class="terminal-amber">Scan completed successfully!</span>`
  },

  exploit: {
    name: 'exploit',
    description: 'Check for vulnerabilities',
    execute: () => `<span class="terminal-green">Running vulnerability scan...</span>
<span class="text-gray-400">Checking for common vulnerabilities...</span>
<span class="terminal-red">CRITICAL: SQL Injection detected!</span>
<span class="terminal-amber">HIGH: XSS vulnerability found!</span>
<span class="text-white">MEDIUM: Outdated SSL certificate</span>
<span class="terminal-green">Scan complete. Contact me for remediation!</span>`
  },

  secure: {
    name: 'secure',
    description: 'Secure the system',
    execute: () => `<span class="terminal-green">Initiating security protocols...</span>
<span class="text-gray-400">Applying security patches...</span>
<span class="text-gray-400">Updating firewall rules...</span>
<span class="text-gray-400">Configuring intrusion detection...</span>
<span class="terminal-green">System secured! All vulnerabilities patched.</span>`
  }
});
