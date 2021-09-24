import Actions from "../../structures/Actions";
import Darwin from "./../../Darwin";
import Message from "./../../structures/Message";

export default class Open extends Actions {
  public constructor(Darwin: Darwin) {
    super(Darwin, {
      name: "Open",
      match: new RegExp("^(open|launch) (.+)?", "i"),
    });
  }
  public async exec(deviceID: number, message: string): Promise<void> {
    const target = message.match(new RegExp("^(open|launch) (.+)?", "i")) //@ts-ignore
      ? message.match(new RegExp("^(open|launch) (.+)?", "i"))[2]
      : null;
    if (!target) return;
    if (
      this.Darwin.clients.find((client) => client.device.id === deviceID)
        ?.device.platform != "windows"
    )
      new Message(
        this.Darwin,
        deviceID,
        `Only windows platform is yet supported!`,
        "Could not open that application"
      ).dispatch();
    const sendMessage = new Message(this.Darwin, deviceID);
    switch (target.toLowerCase()) {
      case "chrome":
        break;
      default:
        sendMessage
          .setContent(`${target} is not a yet supported!`)
          .say("Could not open that application.");
        break;
    }
  }
}
