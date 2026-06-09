import { Server } from "elysia/universal/server";

let appServer: Server | null = null;

export const setSocketServer = (server: Server) => {
  appServer = server;
};

export const publishConservation = (conservationId: string, data: any) => {
  appServer?.publish(`conservation:${conservationId}`, JSON.stringify(data));
};
