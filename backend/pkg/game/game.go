package game

import (
	"fmt"

	"github.com/gorilla/websocket"
)

type Player struct {
  Username string
  Connection *websocket.Conn
}

type Game struct {
  White Player
  Black Player
}

func Move(game Game) {
  fmt.Println("new move")
}
