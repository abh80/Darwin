import WebSocket from "ws";
import Actions from "./structures/Actions";
export interface IDeviceInfo {
  name: string;
  id: number;
  platform: "windows" | "android";
}
export interface IDarwinClientInfo {
  name: string;
  expressServer: Express.Application;
  wss: WebSocket.Server;
  clients: CustomWebSocket[];
  options: IDarwinClientOptions;
  actions: Actions[];
}
export interface IDarwinClientOptions {
  readonly password: string;
  readonly redactCorrectPassword: boolean;
  readonly redactIncorrectPassword: boolean;
}
export interface CustomWebSocket extends WebSocket {
  device: IDeviceInfo;
}
export interface IActions {
  exec(deviceID: number, message: string): void;
}
