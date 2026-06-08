// module/conservation/websocket/conservation.websocket.ts

import Elysia from "elysia";

// export const conservationSocket = new Elysia().ws("/ws/conservation", {
//   message(ws, message) {
//     const data = typeof message === "string" ? JSON.parse(message) : message;

//     if (data.type === "join") {
//       ws.subscribe(`conversation:${data.conversationId}`);
//     }
//   },
// });
export const conservationSocket = new Elysia().ws("/ws/conservation", {
  message(ws, message) {
    console.log("RECEIVED:", message);

    const data = typeof message === "string" ? JSON.parse(message) : message;

    if (data.type === "join") {
      console.log("SUBSCRIBE:", `conversation:${data.conversationId}`);

      ws.subscribe(`conversation:${data.conversationId}`);
    }
  },
});
// export const conservationSocketTest = new Elysia().ws("/ws/conservation/test", {
//   open(ws) {
//     console.log("connected");
//   },

//   message(ws, message) {
//     console.log(message);

//     ws.send(
//       JSON.stringify({
//         ok: true,
//       }),
//     );
//   },
// });
export const conservationSocketTest = new Elysia().ws("/ws/conservation/test", {
  open() {
    console.log("TEST");
  },
});

export const conservationSocketTest1 = new Elysia()
  .get("/ws-check", () => {
    return "socket loaded";
  })
  .ws("/ws/conservation/test1", {
    open() {
      console.log("WS CONNECTED");
    },

    message(ws, message) {
      console.log(message);
      ws.send("pong");
    },

    close() {
      console.log("WS CLOSED");
    },
  });
