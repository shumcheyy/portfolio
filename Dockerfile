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

# If you use other config files (e.g., tsconfig.json, drizzle.config.ts), add them here as needed

WORKDIR /app/client
RUN npm install
RUN npm run build

# --- Go build stage ---
FROM golang:1.24-alpine AS builder
WORKDIR /app
COPY go-server/main.go .
RUN go build -o server main.go

# # --- Final image ---
# FROM alpine:latest
# WORKDIR /app
# COPY --from=builder /app/server .
# COPY --from=frontend /app/dist/public ./public
# ENV PORT=5000
# ENV STATIC_DIR=./public
# EXPOSE 5000
# CMD ["./server"] 
# --- Final image ---
FROM gcr.io/distroless/static-debian12 AS final
WORKDIR /app
COPY --from=builder /app/server .
COPY --from=frontend /app/dist/public ./public
ENV PORT=10000
ENV STATIC_DIR=./public
EXPOSE 10000
USER 65532:65532
CMD ["./server"]