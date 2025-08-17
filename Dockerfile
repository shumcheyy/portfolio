# --- Frontend build stage ---
    FROM node:20-alpine AS frontend
    WORKDIR /app
    
    # Copy frontend source and all config files needed for the build
    COPY client ./client
    COPY package*.json ./
    COPY vite.config.ts ./
    COPY tailwind.config.ts ./
    COPY postcss.config.js ./
    COPY tsconfig.json ./
    
    # Build the frontend using npm build
    
    
    RUN npm install 
    WORKDIR /app/client
    RUN npm run build 
    
    # --- Go build stage ---
    FROM golang:1.24-alpine AS builder
    WORKDIR /app
    COPY go-server/main.go .
    RUN go build -o server main.go
    
    # --- Final image ---
    FROM gcr.io/distroless/static-debian12:latest AS final
    WORKDIR /app
    COPY --from=builder /app/server .
    COPY --from=frontend /app/dist/public ./public
    # Copy resume file from source (not from frontend stage)
    COPY client/public/resume-shubham-choubey.pdf ./public/
    ENV PORT=10000
    ENV STATIC_DIR=./public
    EXPOSE 10000
    USER 65532:65532
    CMD ["./server"]