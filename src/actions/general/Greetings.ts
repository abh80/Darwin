import Actions from "./../../utils/Actions";
import Darwin from "./../../Darwin";

export default class Greetings extends Actions {
  public constructor(Darwin: Darwin) {
    super(Darwin, {
      name: "Greetings",
      match: new RegExp("hi|hello|wassup", "gi"),
    });
  }
  public async exec(deviceID: number): Promise<void> {
    return this.Darwin.say(deviceID, "Hi!");
  }
}
