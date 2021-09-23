import Actions from "../../structures/Actions";
import Darwin from "./../../Darwin";
import Message from "./../../structures/Message";

export default class Greetings extends Actions {
  public constructor(Darwin: Darwin) {
    super(Darwin, {
      name: "Greetings",
      match: new RegExp("hi|hello|wassup", "i"),
    });
  }
  public async exec(deviceID: number, message: string): Promise<void> {
    return new Message(this.Darwin, deviceID)
      .say("Hello")
      .setContent("Hello!")
      .dispatch();
  }
}
