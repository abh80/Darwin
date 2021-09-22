import Darwin from "./../Darwin";
export default class Message {
  private Darwin: Darwin;
  private message: {
    say?: string;
    content?: string;
  };
  private readonly deviceID: number;
  constructor(
    Darwin: Darwin,
    deviceID: number,
    content?: string,
    say?: string
  ) {
    this.Darwin = Darwin;
    this.message = {
      content: content,
      say: say,
    };
    this.deviceID = deviceID;
  }
  public say(message: string): Message {
    this.message.say = message;
    return this;
  }
  public setContent(message: string): Message {
    this.message.content = message;
    return this;
  }
  public dispatch(): void {
    if (!this.message.content) {
      throw new Error("No content set!");
    }
    return void this.Darwin.sendMessage(
      this.deviceID,
      this.Darwin.constants.codes.DISPATCH_MESSAGE,
      this.message
    );
  }
}
