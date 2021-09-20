import * as core from "express-serve-static-core";
import bodyParser from "body-parser";
import Logger from "./../../utils/Logger";
import ActionRouter from "./routes/Actions";
import Darwin from "./../../Darwin";

export default class Rest {
  private server: core.Express;
  private Darwin: Darwin;
  constructor(server: core.Express, Darwin: Darwin) {
    this.server = server;
    this.Darwin = Darwin;
    this.setup();
  }
  private setup(): void {
    Logger.info("Setting up Rest server...");
    this.server.use(bodyParser.json());
    this.server.use("/api/actions", ActionRouter(this.Darwin));
    this.server.use(
      "/api",
      (req: core.Request, res: core.Response, next: core.NextFunction) => {
        if (req.method != "GET") {
          const password = req.headers.authorization;
          if (!password) {
            return res.status(401).send("Unauthorized");
          }
          if (password != this.Darwin.options.password) {
            return res.status(401).send("Unauthorized");
          }
          if (!req.headers["device-id"])
            return res.status(400).send("No device-id header");
          if (
            !this.Darwin.checkIfClientIsConnected(
              parseInt(req.headers["device-id"].toString())
            )
          )
            return res.status(400).send("Client not connected");
        }
        return next();
      }
    );
    
    Logger.success("Rest server is up!");
  }
}
