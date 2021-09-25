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

    const apps = {
      chrome: () => {
        sendMessage
          .setContent(`Launching Chrome`)
          .say("Launching Chrome")
          .dispatch();
        this.Darwin.sendMessage(
          deviceID,
          this.Darwin.constants.codes.DISPATCH_APP_LAUNCH,
          {
            app: "chrome",
          }
        );
      },
      default: () => {
        sendMessage
          .setContent(`${target} is not a yet supported!`)
          .say("Could not open that application.")
          .dispatch();
      },
    };
    //@ts-ignore
    apps[target.toLowerCase()] ? apps[target.toLowerCase()]() : apps.default();
  }
}
