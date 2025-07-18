# Security Professional Portfolio

Interactive terminal-style portfolio website with modern web components and security-themed features.

## 🚀 Quick Start

```bash
# Clone and install
git clone <your-repo-url>
cd portfolio
npm install

# Run development server
npm run dev
# Visit http://localhost:10000
```

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Go server (lightweight) or Node.js/Express
- **Database**: PostgreSQL (optional - for contact form)
- **Deployment**: Docker + Render/Vercel/Railway

## 🎯 Features

- **Interactive Terminal** with security-themed commands
- **Dark/Light Theme** toggle
- **Matrix Rain Effect** (because why not?)
- **Contact Form** with validation
- **Responsive Design** for all devices

## 🖥️ Terminal Commands

Type these in the terminal interface:
- `help` - Show all commands
- `about` - About me
- `skills` - Technical skills
- `projects` - Featured projects
- `contact` - Contact information
- `theme` - Toggle theme
- `matrix` - Toggle matrix effect
- `scan`, `exploit`, `secure` - Security Easter eggs

## 🐳 Docker Deployment

```bash
# Build and run
docker build -t portfolio .
docker run -p 10000:10000 portfolio

# Visit http://localhost:10000
```

## 🔧 Development Options

### Option 1: Node.js Backend
```bash
npm run dev  # Runs on port 10000
```

### Option 2: Go Backend
```bash
# Build frontend first
npm run build
xcopy dist\public go-server\public /E /I /Y

# Run Go server
cd go-server
go run main.go  # Runs on port 10000
```

## 📁 Project Structure

```
├── client/          # React frontend
├── server/          # Node.js backend (optional)
├── go-server/       # Go backend (lightweight)
├── shared/          # Shared types
└── Dockerfile       # Container setup
```

## 🎨 Customization

- **Terminal Commands**: Edit `client/src/lib/terminal-commands.ts`
- **Content**: Update components in `client/src/components/`
- **Styling**: Modify `client/src/index.css` or component files
- **Colors**: Change CSS variables for theme colors

## 🌐 Deployment

### Render (Recommended)
1. Connect GitHub repo
2. Use Docker deployment
3. Set PORT=10000 (automatic)

### Other Platforms
- **Vercel**: Connect repo, auto-deploy
- **Railway**: Docker or Node.js deployment
- **Netlify**: Static hosting (frontend only)

## 📝 Environment Variables

```bash
# Optional - only needed for contact form database
DATABASE_URL=postgresql://user:pass@host:port/db
PORT=10000
NODE_ENV=production
```

## 📄 License

MIT License - Use it for your own portfolio!