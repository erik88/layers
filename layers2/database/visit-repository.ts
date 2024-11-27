import { Database } from "jsr:@db/sqlite@0.11";
import { Visit } from "../service/visit.ts";
import { VisitRecord } from "./visit-record.ts";

export class VisitRepository {
  #db: Database;

  constructor() {
    this.#db = new Database(":memory:");
    this.#db.exec("CREATE TABLE visits(id INTEGER, timeUnixMs INTEGER)");
  }

  addVisit(visit: Visit) {
    const visitRecord = VisitRecord.fromVisit(visit);

    this.#db.exec(
      "INSERT INTO visits (id, timeUnixMs) VALUES(?, ?)",
      visitRecord.id,
      visitRecord.timeUnixMs,
    );
  }

  getAllVisits(): Visit[] {
    const stmt = this.#db.prepare("SELECT id, timeUnixMs FROM visits");

    const visits = stmt.values().map(([id, timeUnixMs]) =>
      new VisitRecord(id, timeUnixMs)
    );

    return visits.map((v) => v.toVisit());
  }
}
