# Security Professional Portfolio

Interactive terminal-style portfolio website showcasing security expertise with a unique hybrid design.

## 🚀 Quick Start

```bash
# Clone and setup
git clone <your-repo-url>
cd portfolio
npm install

# Development (Option 1: Frontend only)
npm run dev
# Visit http://localhost:5173

# Development (Option 2: Full-stack with Go backend)
npm run build
xcopy dist\public go-server\public /E /I /Y
cd go-server && go run main.go
# Visit http://localhost:10000
```

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Go (lightweight, fast)
- **Styling**: Tailwind CSS + shadcn/ui components
- **Deployment**: Docker + Render/Vercel/Railway

## 🎯 Features

- **Interactive Terminal Interface** with security-themed commands
- **Hybrid Design**: Terminal + modern web components
- **Dark/Light Theme** toggle
- **Matrix Rain Effect** (optional visual enhancement)
- **Working Contact Form** (Go backend handles submissions)
- **Responsive Design** for all devices
- **Security Easter Eggs** in terminal commands

## 🖥️ Terminal Commands

Try these commands in the terminal interface:

| Command | Description |
|---------|-------------|
| `help` | Show all available commands |
| `about` | Learn about professional background |
| `experience` | View work history |
| `skills` | Display technical skills |
| `projects` | Show featured projects |
| `contact` | Get contact information |
| `resume` | Download resume |
| `theme` | Toggle dark/light mode |
| `matrix` | Toggle matrix rain effect |
| `scan` | Run network scan (Easter egg) |
| `exploit` | Check vulnerabilities (Easter egg) |
| `secure` | Secure the system (Easter egg) |

## 🔧 Development

### Frontend Development
```bash
npm run dev          # Vite dev server on port 5173
npm run build        # Build for production
npm run preview      # Preview built app
```

### Full-Stack Development
```bash
# Build frontend
npm run build

# Copy to Go server
xcopy dist\public go-server\public /E /I /Y

# Run Go backend
cd go-server
go run main.go       # Serves on port 10000
```

## 🐳 Docker Deployment

```bash
# Build image
docker build -t portfolio .

# Run container
docker run -p 10000:10000 portfolio

# Visit http://localhost:10000
```

## 📁 Project Structure

```
├── client/              # React frontend source
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── hooks/       # Custom hooks
│   │   └── lib/         # Utilities
├── go-server/           # Go backend
│   ├── main.go         # Go server code
│   └── public/         # Built frontend files (auto-generated)
├── Dockerfile          # Multi-stage Docker build
├── package.json        # Frontend dependencies only
└── README.md          # This file
```

## 🌐 Deployment Options

### Render (Recommended)
1. Connect GitHub repository
2. Choose "Docker" deployment
3. Set PORT=10000 (automatic)
4. Deploy!

### Other Platforms
- **Vercel**: Connect repo, auto-deploy frontend
- **Railway**: Docker deployment with Go backend
- **Netlify**: Static hosting (frontend only)

## 🎨 Customization

### Adding Terminal Commands
Edit `client/src/lib/terminal-commands.ts`:
```typescript
{
  name: 'mycommand',
  description: 'My custom command',
  execute: () => {
    return 'Command output here';
  }
}
```

### Updating Content
- **Experience**: `client/src/components/ExperienceTimeline.tsx`
- **Skills**: `client/src/components/SkillsGrid.tsx`
- **Projects**: `client/src/components/ProjectsGrid.tsx`
- **Contact Info**: `client/src/components/HeroSection.tsx`

### Styling
- **Theme Colors**: `client/src/index.css` (CSS variables)
- **Components**: Tailwind classes in component files
- **Terminal Theme**: Terminal color variables in CSS

## 🔧 Environment Variables

```bash
# Optional - Go server configuration
PORT=10000                    # Server port (default: 10000)
STATIC_DIR=./public          # Static files directory
```

## 🚀 Architecture

### Development Flow
1. **Frontend**: Vite dev server with hot reload
2. **Backend**: Go server handles API endpoints
3. **Proxy**: Vite proxies `/api` requests to Go server

### Production Flow
1. **Build**: React app compiled to static files
2. **Copy**: Static files moved to Go server directory
3. **Serve**: Go server serves both static files and API
4. **Deploy**: Single Docker container with everything

## 📝 API Endpoints

The Go backend provides these endpoints:

- `POST /api/contact` - Submit contact form
- `GET /api/contacts` - Get all contacts (admin)
- `GET /*` - Serve static frontend files

## 🛡️ Security Features

- **Distroless Docker image** for minimal attack surface
- **Non-root user** in container
- **Input validation** on contact form
- **CORS protection** built-in
- **No database** (in-memory storage for simplicity)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Commit: `git commit -m "Add feature"`
6. Push: `git push origin feature-name`
7. Submit a pull request

## 📄 License

MIT License - Feel free to use this for your own portfolio!

## 🆘 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Check what's using port 10000
netstat -ano | findstr :10000

# Use different port
set PORT=8080
go run main.go
```

**Frontend not loading:**
```bash
# Rebuild and copy frontend
npm run build
xcopy dist\public go-server\public /E /I /Y
```

**Docker build fails:**
```bash
# Clean build
docker system prune
docker build --no-cache -t portfolio .
```

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Create an issue in the GitHub repository
3. Include error messages and steps to reproduce

---

**Built with ❤️ for security professionals who love clean code and terminal interfaces.**