# Go Backend for ResumeTerminal

This is the Go backend for the ResumeTerminal project. It provides API endpoints for the contact form and serves the static frontend in production.

## Endpoints
- `POST /api/contact` — Submit a contact form (JSON)
- `GET /api/contacts` — Get all submitted contacts (in-memory)

## Development
1. Make sure you have Go installed (1.18+ recommended).
2. Run the server:
   ```sh
   go run main.go
   ```
3. The server listens on port 5000 by default. Use the `PORT` environment variable to change it.
4. During development, Vite will proxy `/api` requests to this server.

## Production
- Build the frontend with Vite (`npm run build`).
- Copy the build output (usually `dist/public`) to the Go server's static directory (default: `./public`).
- Start the Go server (`go run main.go` or build a binary).

## Containerization
- The server is ready for Docker. Use `PORT` and `STATIC_DIR` environment variables as needed.
- Example Dockerfile can be added. 