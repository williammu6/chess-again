package socket

import (
  "fmt"
  "log"
	"net/http"
	"github.com/gorilla/websocket"
  "encoding/json"
	g "github.com/williammu6/chess-again/backend/pkg/game"
)

var playersInQueue []g.Player
var games []*g.Game

var upgrader = websocket.Upgrader{
  CheckOrigin: func(r *http.Request) bool {
    return true
  },
}

func HandleNewConnection(w http.ResponseWriter, r *http.Request) {
  conn, err := upgrader.Upgrade(w, r, nil)

  if err != nil {
    log.Print("Error during connection upgradation:", err)
    return
  }

  username := r.URL.Query().Get("username")
  fmt.Println(username, "Connected")

  newPlayer := g.Player {
    Username: username,
    Connection: conn,
  }

  playersInQueue = append(playersInQueue, newPlayer)

  if len(playersInQueue) % 2 == 0 {
    NewGame(playersInQueue[len(playersInQueue)-2], newPlayer)
  } 

  HandleMessages(conn)
}

func NewGame(player1 g.Player, player2 g.Player) {
  newGame := &g.Game{
    White: player1,
    Black: player2,
  }
  playersInQueue = playersInQueue[:len(playersInQueue)-2]
  games = append(games, newGame)

  message := MessageEnvelope{
    Type: GameStart,
    Message: newGame,
  }

  BroadcastMessageGame(newGame, message)
}

func BroadcastMessageGame(game *g.Game, message interface{}) {
  jsonMessage, _ := json.Marshal(message)
  stringMessage := string(jsonMessage)
  SendMessage(game.White, stringMessage)
  SendMessage(game.Black, stringMessage)
}

func SendMessage(player g.Player, message string) {
  err := player.Connection.WriteMessage(websocket.TextMessage, []byte(message))
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
