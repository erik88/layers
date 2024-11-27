export class Visit {
  id: number;
  time: Temporal.Instant;

  constructor(id: number, time: Temporal.Instant) {
    this.id = id;
    this.time = time;
  }
}
