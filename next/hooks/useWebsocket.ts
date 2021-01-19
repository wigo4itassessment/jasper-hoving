import { useEffect, useState } from "react"
import { HerdResponse, LabYak, StockResponse } from "../types"

/** Custom hook to handle websocket updates to stock & herd*/

function useWebsockets(herd?: HerdResponse[], stock?: StockResponse) {
  const [updatedHerd, setHerd] = useState(herd)
  const [updatedStock, setStock] = useState(stock)

  useEffect(() => {
    let socket = new WebSocket("ws://localhost:8080")
    socket.onopen = function (e) {
      console.log("[open] Connection established")

      socket.onmessage = function (event) {
        console.log(`[message] Data received from server`)
        try {
          const data = JSON.parse(event.data)
          console.log(data)
          setHerd(data.herd)
          setStock(data.stock)
        } catch (err) {
          console.error("error parsing JSON from websocket")
        }
      }

      socket.onclose = function (event) {
        if (event.wasClean) {
          console.log(
            `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
          )
        } else {
          // e.g. server process killed or network down
          // event.code is usually 1006 in this case
          console.log("[close] Connection died")
        }
      }

      socket.onerror = function (error: any) {
        console.log(`[error] ${error.message}`)
      }
    }
  }, [])

  return { updatedHerd, updatedStock }
}

export default useWebsockets
