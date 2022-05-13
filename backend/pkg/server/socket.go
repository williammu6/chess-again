package server

import (
  "fmt"
  "log"
	"net/http"
	"github.com/gorilla/websocket"
	g "github.com/williammu6/chess-again/backend/pkg/game"
)

var playersInQueue []g.Player
var games []*g.Game

var upgrader = websocket.Upgrader{
  CheckOrigin: func(r *http.Request) bool {
    return true
  },
}

func HandleConnection(w http.ResponseWriter, r *http.Request, username string) {
  conn, err := upgrader.Upgrade(w, r, nil)

  if err != nil {
    log.Print("Error during connection upgradation:", err)
    return
  }

  newPlayer := g.Player {
    Username: username,
    Connection: conn,
  }

  fmt.Println(newPlayer)

  playersInQueue = append(playersInQueue, newPlayer)

  fmt.Println(len(playersInQueue))

  if len(playersInQueue) % 2 == 0 {
    NewGame(playersInQueue[len(playersInQueue)-2], newPlayer)
  } 

  HandleMessages(conn)
}

func NewGame(player1 g.Player, player2 g.Player) *g.Game {
  newGame := &g.Game{
    White: player1,
    Black: player2,
  }
  playersInQueue = playersInQueue[:len(playersInQueue)-2]
  games = append(games, newGame)

  SendMessage(player1.Connection, player2.Username)
  SendMessage(player2.Connection, player1.Username)
  fmt.Println("New game yay")
  return newGame
}

func SendMessage(conn *websocket.Conn, message string) {
  err := conn.WriteMessage(websocket.TextMessage, []byte(message))
  if err != nil {
    fmt.Println("Error during message writing:", err)
  }
}

func HandleMessages(conn *websocket.Conn) {
  defer conn.Close()

  for {
    _, message, err := conn.ReadMessage()
    if err != nil {
      log.Println("Error during message reading:", err)
      break
    }
    log.Printf("Received: %s", message)
  }
}
