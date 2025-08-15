package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"sync"
	"time"
)

// Contact represents a contact form submission
type Contact struct {
	ID          int       `json:"id"`
	Name        string    `json:"name"`
	Email       string    `json:"email"`
	ProjectType string    `json:"projectType"`
	Message     string    `json:"message"`
	CreatedAt   time.Time `json:"createdAt"`
}

type contactStore struct {
	sync.Mutex
	contacts []Contact
	nextID   int
}

func newContactStore() *contactStore {
	return &contactStore{contacts: make([]Contact, 0), nextID: 1}
}

func (s *contactStore) add(c Contact) Contact {
	s.Lock()
	defer s.Unlock()
	c.ID = s.nextID
	s.nextID++
	c.CreatedAt = time.Now()
	s.contacts = append(s.contacts, c)
	return c
}

func (s *contactStore) all() []Contact {
	s.Lock()
	defer s.Unlock()
	// Return in reverse order (newest first)
	contacts := make([]Contact, len(s.contacts))
	copy(contacts, s.contacts)
	for i, j := 0, len(contacts)-1; i < j; i, j = i+1, j-1 {
		contacts[i], contacts[j] = contacts[j], contacts[i]
	}
	return contacts
}

var store = newContactStore()

func main() {
	port := getEnv("PORT", "10000")
	staticDir := getEnv("STATIC_DIR", "./public")

	http.HandleFunc("/api/contact", handleContact)

	// Serve static files with SPA fallback (secure against path traversal)
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// Clean the path to remove any .. or . components
		cleanPath := filepath.Clean(r.URL.Path)

		// Build full path by joining staticDir with cleaned path
		fullPath := filepath.Join(staticDir, cleanPath)

		// Security check: ensure the resolved path is within staticDir
		absStaticDir, err := filepath.Abs(staticDir)
		if err != nil {
			http.Error(w, "Internal server error", http.StatusInternalServerError)
			return
		}

		absFullPath, err := filepath.Abs(fullPath)
		if err != nil {
			http.Error(w, "Internal server error", http.StatusInternalServerError)
			return
		}

		// Prevent path traversal: ensure resolved path is strictly within static directory
		relPath, err := filepath.Rel(absStaticDir, absFullPath)
		if err != nil || strings.HasPrefix(relPath, "..") {
			http.Error(w, "Access denied", http.StatusForbidden)
			return
		}

		// Check if file exists
		if _, err := os.Stat(fullPath); os.IsNotExist(err) {
			// SPA fallback: serve index.html for non-existent files
			http.ServeFile(w, r, filepath.Join(staticDir, "index.html"))
			return
		}

		// Serve the requested file
		http.ServeFile(w, r, fullPath)
	})

	log.Printf("[go-server] Serving on 0.0.0.0:%s, static dir: %s", port, staticDir)
	if err := http.ListenAndServe("0.0.0.0:"+port, nil); err != nil {
		log.Fatalf("server failed: %v", err)
	}
}

func handleContact(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}
	var c Contact
	if err := json.NewDecoder(r.Body).Decode(&c); err != nil {
		respondJSON(w, http.StatusBadRequest, map[string]interface{}{
			"success": false,
			"message": "Invalid JSON",
		})
		return
	}
	// Basic validation (match frontend expectations)
	if len(c.Name) < 2 || len(c.Email) < 5 || len(c.ProjectType) < 1 || len(c.Message) < 10 {
		respondJSON(w, http.StatusBadRequest, map[string]interface{}{
			"success": false,
			"message": "Validation error",
		})
		return
	}
	contact := store.add(c)
	respondJSON(w, http.StatusOK, map[string]interface{}{
		"success": true,
		"message": "Message sent successfully",
		"id":      contact.ID,
	})
}

func respondJSON(w http.ResponseWriter, status int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(data)
}

func getEnv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
