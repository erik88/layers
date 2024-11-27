import { Hono } from "@hono/hono";
import { Database } from "jsr:@db/sqlite@0.11";
import { Visit } from "./visit.ts";

// Initialization
// ---------------------------------------

const app = new Hono();
const db = new Database(":memory:");
db.exec("CREATE TABLE visits(id INTEGER, timeUnixMs INTEGER)");

// Endpoints
// ---------------------------------------

app.get("/", (c) => {
  const now = Temporal.Now.instant().epochMilliseconds;
  const id = Math.floor(Math.random() * 2_000_000_000);
  const visit = new Visit(id, now);

  db.exec(
    "INSERT INTO visits (id, timeUnixMs) VALUES(?, ?)",
    visit.id,
    visit.timeUnixMs,
  );

  return c.text("Your visitor id was " + id);
});

app.get("/stats", (c) => {
  const stmt = db.prepare("SELECT id, timeUnixMs FROM visits");

  const visits = stmt.values().map(([id, timeUnixMs]) =>
    new Visit(id, timeUnixMs)
  );

  return c.html(
    `<style>
      td,th {border: 1px solid gray; text-align: center}
      table {border-collapse: collapse}
    </style>
    <table>
      <tr>
        <th>Id</th>
        <th>Time (unit milliseconds)</th>
      </tr>
    ${
      visits.map((v) => `<tr><td>${v.id}</td><td>${v.timeUnixMs}</td></tr>`)
        .join("")
    }
      </table>
  `,
  );
});

export default app;
