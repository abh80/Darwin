import Actions from "./../../utils/Actions";
import Darwin from "./../../Darwin";
const LyricsApi = require("findthelyrics");

export default class Lyrics extends Actions {
  public constructor(Darwin: Darwin) {
    super(Darwin, {
      name: "Lyrics",
      match: new RegExp("tell the lyrics of (.+)?", "i"),
    });
  }
  public async exec(deviceID: number, message: string): Promise<void> {
    const song = message.match(/tell the lyrics of (.+)?/i) // @ts-ignore
      ? message.match(/tell the lyrics of (.+)?/i)[1]
      : null;
    if (!song)
      return this.Darwin.say(
        deviceID,
        "I don't know what song you want me to look up."
      );

    LyricsApi.find(song, (err: any, data: any) => {
      if (err) return this.Darwin.say(deviceID, err);

      this.Darwin.say(deviceID, data);
    });
  }
}
