import { Router } from "express";
import Darwin from "./../../../Darwin";
export default function ActionRouter(Darwin: Darwin): Router {
  const router = Router();
  router.post("/create", (req, res) => {
    const message = req.body.message;
    Darwin.actions
      .find((x) => x.opts.match?.test(message))
      ?.exec(parseInt(req.headers["device-id"]?.toString() || ""), message);
    res.send("Action Created!");
  });
  return router;
}
