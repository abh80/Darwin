import Actions from "../../structures/Actions";
import Darwin from "./../../Darwin";
import Message from "./../../structures/Message";
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
    const sendMessage = new Message(this.Darwin, deviceID);
    if (!song)
      return sendMessage
        .setContent("Please provide a song name")
        .say("Please provide a song name")
        .dispatch();

    LyricsApi.find(song, (err: any, data: any) => {
      if (err) {
        return sendMessage
          .setContent("❌ Sorry I could'nt find the song")
          .say("Sorry I could'nt find the song")
          .dispatch();
      }

      sendMessage
        .setContent(data)
        .say("Here are your lyrics!")
        .dispatch();
    });
  }
}
