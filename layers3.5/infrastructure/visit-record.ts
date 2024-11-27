import { Visit } from "../domain/visit.ts";

export class VisitRecord {
  id: number;
  timeUnix: number;

  constructor(id: number, timeUnix: number) {
    this.id = id;
    this.timeUnix = timeUnix;
  }

  static fromVisit(visit: Visit) {
    return new VisitRecord(visit.id, visit.time.epochMilliseconds / 1000);
  }

  toVisit() {
    return new Visit(
      this.id,
      Temporal.Instant.fromEpochMilliseconds(this.timeUnix * 1000),
    );
  }
}
