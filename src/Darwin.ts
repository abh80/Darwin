import {
  IDarwinClientInfo,
  IDarwinClientOptions,
  CustomWebSocket,
} from "./Inteface";
import Logger from "./utils/Logger";
import express from "express";
import { Server } from "ws";
import Websocket from "./network/Websocket";
import Rest from "./network/rest/Rest";
import Constants from "./Constants";
import fs from "fs";
import path from "path";
import Actions from "./utils/Actions";

export default class Darwin implements IDarwinClientInfo {
  name: string;
  expressServer: Express.Application;
  wss: Server;
  clients: CustomWebSocket[];
  options: IDarwinClientOptions;
  actions: Actions[];
  public constructor(
    name: string,
    expressServer: express.Express,
    wss: Server,
    options: IDarwinClientOptions
  ) {
    this.name = name;
    this.expressServer = expressServer;
    this.wss = wss;
    this.clients = new Array<CustomWebSocket>();
    this.options = options;
    this.actions = new Array<Actions>();
    new Rest(expressServer, this);
    Logger.success(`${this.name} is ready`);
    this.init();
  }

  private init(): void {
    const ws = new Websocket(this.wss, this);
    this.setupActions();
  }
  private setupActions(): void {
    const categories = fs.readdirSync(path.join(__dirname, "actions"));
    for (const category of categories) {
      let actions = fs.readdirSync(path.join(__dirname, "actions", category));
      actions = actions.filter((a: string) => a.endsWith(".js"));
      actions.forEach((action: string) => {
        let file: Actions = require(path.join(
          __dirname,
          "actions",
          category,
          action
        )).default as Actions;
        // @ts-ignore
        file = new (file as Actions)(this);
        this.actions.push(file);
      });
    }
    Logger.success("Loaded a total of " + this.actions.length + " actions!");
  }
  public addClient(client: CustomWebSocket): void {
    this.clients.push(client);
  }
  public checkIfClientIsConnected(deviceId: number): boolean {
    return this.clients.some((c: CustomWebSocket) => c.device.id == deviceId);
  }
  public removeClient(client: CustomWebSocket): void {
    this.clients = this.clients.filter(
      (c: CustomWebSocket) => c.device.id !== client.device.id
    );
  }
  public say(deviceID: number, message: string): void {
    this.sendMessage(deviceID, Constants.codes.DISPATCH_MESSAGE, {
      content: message,
    });
  }
  public sendMessage(to: number, code: number, body: Object): void {
    this.clients
      .find((c: CustomWebSocket) => c.device.id == to)
      ?.send(JSON.stringify({ code, body }));
  }
}
