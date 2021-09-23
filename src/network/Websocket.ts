import { EventEmitter } from "events";
import { Server } from "ws";
import Constants from "../Constants";
import Darwin from "../Darwin";
import { CustomWebSocket } from "../Inteface";
import Logger from "../utils/Logger";

export default class Websocket extends EventEmitter {
  wss: Server;
  Darwin: Darwin;
  constructor(wss: Server, Darwin: Darwin) {
    super();
    this.wss = wss;
    this.Darwin = Darwin;
    this.init();
  }
  private init() {
    this.wss.on("connection", (ws, req) => {
      ws.on("close", () => {
        if (!(ws as CustomWebSocket).device) return;
        Logger.info(
          "WebSocket: Connection (" +
            (ws as CustomWebSocket).device.name +
            ") closed"
        );
        this.Darwin.removeClient(ws as CustomWebSocket);
      });
      if (!req.headers.authorization) {
        ws.close();
        return void Logger.info(
          "Websocket: Connection rejected because of no authorization header"
        );
      }
      if (!req.headers["platform"]) {
        ws.close();
        return void Logger.info(
          "Websocket: Connection rejected because of no platform header"
        );
      }
      if (
        ["windows", "android"].indexOf(req.headers["platform"].toString()) ===
        -1
      ) {
        ws.close();
        return void Logger.info(
          "Websocket: Connection rejected because of wrong platform"
        );
      }
      if (!req.headers["name"]) {
        ws.close();
        return void Logger.info(
          "Websocket: Connection rejected because of no name header"
        );
      }
      const platform = req.headers["platform"].toString();
      const password = req.headers.authorization;
      const name = req.headers["name"].toString();

      if (password !== this.Darwin.options.password) {
        ws.close();
        return void Logger.info(
          "Websocket: Connection rejected because of invalid password : " +
            (this.Darwin.options.redactIncorrectPassword
              ? "[redacted]"
              : password)
        );
      }
      Logger.info(
        "Websocket: Connection accepted (" +
          name +
          ") with password : " +
          (this.Darwin.options.redactCorrectPassword ? "[redacted]" : password)
      );

      const id = Math.floor(Math.random() * 10000000) + 10000000;
      Object.defineProperty(ws, "device", { value: { platform, name, id } });

      this.Darwin.addClient(ws as CustomWebSocket);
      this.Darwin.sendMessage(id, Constants.codes.AUTHORIZATION_MESSAGE, {
        ...(ws as CustomWebSocket).device,
        assistantName: this.Darwin.name,
      });
    });
  }
}
