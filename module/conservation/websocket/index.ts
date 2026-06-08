import { Server } from "elysia/universal/server";

let appServer: Server | null = null;

export const setSocketServer = (server: Server) => {
  appServer = server;
};

export const publishConversation = (conversationId: string, data: any) => {
  appServer?.publish(`conversation:${conversationId}`, JSON.stringify(data));
};
