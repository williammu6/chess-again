package socket

type MessageType int64

const (
  GameStart MessageType = iota
  GameFinish
  Move
)

type MessageEnvelope struct { 
  Type MessageType
  Message interface{}
}
