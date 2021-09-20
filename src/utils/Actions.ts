import Darwin from "./../Darwin";
import { IActions } from './../Inteface';

export default class Actions implements IActions {
  Darwin: Darwin;
  opts: { name: string | null; match: RegExp | null };
  constructor(
    Darwin: Darwin,
    opts: { name: string | null; match: RegExp | null }
  ) {
    this.Darwin = Darwin;
    this.opts = opts;
  }
  exec(deviceID: number): void {
    throw new Error("Method not implemented.");
  }
}
