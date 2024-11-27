import { Database } from "jsr:@db/sqlite@0.11";
import { Visit } from "../service/visit.ts";
import { VisitRecord } from "./visit-record.ts";

export class VisitRepository {
  #db: Database;

  constructor() {
    this.#db = new Database(":memory:");
    this.#db.exec("CREATE TABLE visits(id INTEGER, timeUnix BIGINT)");
  }

  addVisit(visit: Visit) {
    const visitRecord = VisitRecord.fromVisit(visit);

    this.#db.exec(
      "INSERT INTO visits (id, timeUnix) VALUES(?, ?)",
      visitRecord.id,
      visitRecord.timeUnix,
    );
  }

  getAllVisits(): Visit[] {
    const stmt = this.#db.prepare("SELECT id, timeUnix FROM visits");

    const visits = stmt.values().map(([id, timeUnix]) =>
      new VisitRecord(id, timeUnix)
    );

    return visits.map((v) => v.toVisit());
  }
}
