import Chalk from "chalk";
export default class Logger {
  static warn(message: string): void {
    console.log(Chalk.yellowBright("[Warn] " + message));
  }
  static info(message: string): void {
    console.log(Chalk.blueBright("[Info] " + message));
  }
  static error(message: string): void {
    console.log(Chalk.redBright("[Error] " + message));
  }
  static success(message: string): void {
    console.log(Chalk.greenBright(message));
  }
}
