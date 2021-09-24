import Actions from "../../structures/Actions";
import Darwin from "./../../Darwin";
import Message from "./../../structures/Message";

export default class Owner extends Actions {
  public constructor(Darwin: Darwin) {
    super(Darwin, {
      name: "Owner",
      match: new RegExp("^who (made|created) you", "i"),
    });
  }
  public async exec(deviceID: number, message: string): Promise<void> {
    return new Message(this.Darwin, deviceID)
      .say("I was created by Stars Tracker!")
      .setContent("I was created by Stars Tracker")
      .dispatch();
  }
}
