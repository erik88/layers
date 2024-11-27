export class Visit {
  id: number;
  timeUnix: number;

  constructor(id: number, timeUnixMs: number) {
    this.id = id;
    this.timeUnix = timeUnixMs;
  }
}
