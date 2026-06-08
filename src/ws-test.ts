import { Elysia } from "elysia";

new Elysia()
  .ws("/ws", {
    open() {
      console.log("connected");
    },

    message(ws, message) {
      console.log(message);
      ws.send("pong");
    },
  })
  .listen(3000);

console.log("WS running");
