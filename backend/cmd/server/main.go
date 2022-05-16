package main

import (
	"fmt"
	"log"
	"net/http"

  s "github.com/williammu6/chess-again/backend/pkg/socket"
)

func playHandler(w http.ResponseWriter, r *http.Request) {
  s.HandleNewConnection(w, r)
}

func main() {
  http.HandleFunc("/play", playHandler)
  fmt.Printf("Waiting connection ...")
  log.Fatal(http.ListenAndServe("localhost:8080", nil))
}
