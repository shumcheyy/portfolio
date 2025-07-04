package main

import (
	"encoding/json"
	"log"
	"net/http"
	"os"
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
	port := getEnv("PORT", "5000")
	staticDir := getEnv("STATIC_DIR", "./public")

	http.HandleFunc("/api/contact", handleContact)
	http.HandleFunc("/api/contacts", handleContacts)

	// Serve static files
	http.Handle("/", http.FileServer(http.Dir(staticDir)))

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

func handleContacts(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}
	contacts := store.all()
	respondJSON(w, http.StatusOK, map[string]interface{}{
		"success":  true,
		"contacts": contacts,
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
