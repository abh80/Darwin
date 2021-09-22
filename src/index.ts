import express from "express";
import * as WebSocket from "ws";
import * as http from "http";
import Darwin from "./Darwin";
import config from "./config.json";
import Logger from "./utils/Logger";
import { IDarwinClientOptions } from "./Inteface";

const DarwinOptions: IDarwinClientOptions = {
  password: config.password || process.env["PASSWORD"] || "password",
  redactCorrectPassword: config.redactCorrectPassword || false,
  redactIncorrectPassword: config.redactIncorrectPassword || false,
};
Logger.info("Starting server...");
const app = express();
const server = http.createServer(app);

const wss = new WebSocket.Server({ server, path: "/gateway" });

server.listen(config.PORT || 3500, () => {
  Logger.success(`Server is listening on port ${config.PORT || 3500}`);
  new Darwin(config.NAME, app, wss, DarwinOptions);
});
app.on("error", (err: any) => {
  Logger.error(err);
});
server.on("error", (err) => {
  Logger.error(err.message);
});
process.on("uncaughtException", (err) => {
  Logger.error((err as any).message);
});
process.on("unhandledRejection", (err) => {
  Logger.error((err as any).message);
});
