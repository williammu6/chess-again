package server

import (
  "fmt"
  "log"
  "net/http"

  "github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
  CheckOrigin: func(r *http.Request) bool {
    return true
  },
}

func wsHandler(w http.ResponseWriter, r *http.Request) {
  fmt.Println("Connected")

  conn, err := upgrader.Upgrade(w, r, nil)
  if err != nil {
    log.Print("Error during connection upgradation:", err)
    return
  }
  defer conn.Close()

  for {
    messageType, message, err := conn.ReadMessage()
    if err != nil {
      log.Println("Error during message reading:", err)
      break
    }
    log.Printf("Received: %s", message)
    err = conn.WriteMessage(messageType, message)
    if err != nil {
      log.Println("Error during message writing:", err)
      break
    }
  }
}

func main() {
  http.HandleFunc("/ws", wsHandler)
  fmt.Printf("Waiting connection ...")
  log.Fatal(http.ListenAndServe("localhost:8080", nil))
}
