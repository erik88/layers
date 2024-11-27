import { Visit } from "../service/visit.ts";

export class VisitRecord {
  id: number;
  timeUnixMs: number;

  constructor(id: number, timeUnixMs: number) {
    this.id = id;
    this.timeUnixMs = timeUnixMs;
  }

  static fromVisit(visit: Visit) {
    return new VisitRecord(visit.id, visit.time.epochMilliseconds);
  }

  toVisit() {
    return new Visit(
      this.id,
      Temporal.Instant.fromEpochMilliseconds(this.timeUnixMs),
    );
  }
}
