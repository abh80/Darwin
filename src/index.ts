import express from "express";
import * as WebSocket from "ws";
import * as http from "http";
import Darwin from "./Darwin";
import config from "./config.json";
import Logger from "./utils/Logger";
import { IDarwinClientOptions } from "./Inteface";

const DarwinOptions: IDarwinClientOptions = {
  password: process.env["password"] || config.password || "password",
  redactCorrectPassword:
    (process.env["redact_correct_password"] ? true : false) ||
    config.redactCorrectPassword ||
    false,
  redactIncorrectPassword:
    (process.env["redact_incorrect_password"] ? true : false) ||
    config.redactIncorrectPassword ||
    false,
};
Logger.info("Starting server...");
const app = express();
const server = http.createServer(app);

const wss = new WebSocket.Server({ server, path: "/gateway" });

server.listen(process.env["port"] || config.PORT || 3500, () => {
  Logger.success(
    `Server is listening on port ${process.env["PORT"] || config.PORT || 3500}`
  );
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
