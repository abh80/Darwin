import Actions from "../../structures/Actions";
import Darwin from "./../../Darwin";
import Message from "./../../structures/Message";

export default class Greetings extends Actions {
  public constructor(Darwin: Darwin) {
    super(Darwin, {
      name: "Greetings",
      match: new RegExp("(hi|hello|wassup|hola|bonjour|hey|sup)", "i"),
    });
  }
  public async exec(deviceID: number, message: string): Promise<void> {
    const responses = [
      "Hello!",
      "Hi!",
      "Hey!",
      "Howdy!",
      "Greetings!",
      "How are you?",
      "How's it going?",
      "How's life?",
      "Hola!",
    ];
    const response = responses[Math.floor(Math.random() * responses.length)];
    return new Message(this.Darwin, deviceID)
      .say(response)
      .setContent(response)
      .dispatch();
  }
}
