# Security Professional Portfolio

A modern, interactive terminal-style portfolio website showcasing security expertise with hybrid design combining terminal interface and modern web components.

## Features

- **Interactive Terminal**: Security-themed commands and Easter eggs
- **Hybrid Design**: Terminal interface with modern content sections
- **Dark/Light Theme**: Toggle via button or terminal command
- **Matrix Rain Effect**: Optional visual enhancement
- **Responsive Design**: Works on desktop and mobile
- **Contact Form**: Functional contact system with validation
- **Professional Content**: Real experience and skills from security background

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: TanStack Query
- **Build Tool**: Vite with hot module replacement

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Add your DATABASE_URL
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Visit** `http://localhost:5000`

## Terminal Commands

Try these commands in the terminal interface:

- `help` - Show all available commands
- `about` - Learn about the professional background
- `experience` - View work history
- `skills` - Display technical skills
- `projects` - Show featured projects
- `contact` - Get contact information
- `resume` - Download resume
- `theme` - Toggle dark/light mode
- `matrix` - Toggle matrix rain effect
- `scan` - Run network scan (Easter egg)
- `exploit` - Check vulnerabilities (Easter egg)
- `secure` - Secure the system (Easter egg)

## Deployment

### Environment Variables

Create a `.env` file with:

```
DATABASE_URL=your_postgresql_connection_string
NODE_ENV=production
PORT=5000
```

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel/Netlify/Railway

1. **Vercel**: Connect your GitHub repo and deploy
2. **Railway**: Deploy with PostgreSQL addon
3. **Netlify**: Use for static hosting (frontend only)

### Domain Setup

1. Purchase domain from your preferred registrar
2. Configure DNS to point to your hosting provider
3. Set up SSL certificate (usually automatic)
4. Update any hardcoded URLs in the application

## Project Structure

```
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── hooks/       # Custom hooks
│   │   └── lib/         # Utilities
├── server/              # Express backend
├── shared/              # Shared types/schemas
└── public/              # Static assets
```

## Customization

### Adding New Terminal Commands

1. Edit `client/src/lib/terminal-commands.ts`
2. Add command to the commands object
3. Implement the execute function

### Updating Content

- **Experience**: Edit `client/src/components/ExperienceTimeline.tsx`
- **Skills**: Update `client/src/components/SkillsGrid.tsx`
- **Projects**: Modify `client/src/components/ProjectsGrid.tsx`
- **Contact Info**: Update `client/src/components/HeroSection.tsx`

### Styling

- **Colors**: Modify CSS variables in `client/src/index.css`
- **Components**: Use Tailwind classes or edit component files
- **Terminal Theme**: Update terminal color variables

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this for your own portfolio!

## Support

For issues or questions about deployment, create an issue in the GitHub repository.

## Go Backend Migration

### Running the Go Backend (Development)
1. Build the frontend as usual with Vite (`npm run dev` for development, `npm run build` for production).
2. Start the Go backend:
   ```sh
   cd go-server
   go run main.go
   ```
   The Go server will listen on port 5000 and serve API endpoints at `/api`.
3. During development, Vite will proxy `/api` requests to the Go backend (see `vite.config.ts`).

### Production
- Build the frontend with Vite (`npm run build`).
- Copy the build output (usually `dist/public`) to the Go server's static directory (default: `./public`).
- Start the Go server (`go run main.go` or build a binary).
- The Go server will serve both the static frontend and API on port 5000.

### Containerization
- The Go server is ready for containerization. Use environment variables `PORT` and `STATIC_DIR` to configure the server.
- Example Dockerfile and instructions can be added as needed.