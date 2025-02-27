import { Hono } from "@hono/hono";
import { Database } from "jsr:@db/sqlite@0.11";
import { Visit } from "./visit.ts";

// Initialization
// ---------------------------------------

const app = new Hono();
const db = new Database(":memory:");
db.exec("CREATE TABLE visits(id INTEGER, timeUnix INTEGER)");

// Endpoints
// ---------------------------------------

app.get("/", (c) => {
  const now = Temporal.Now.instant().epochMilliseconds / 1000;
  const id = Math.floor(Math.random() * 2_000_000_000);
  const visit = new Visit(id, now);

  db.exec(
    "INSERT INTO visits (id, timeUnix) VALUES(?, ?)",
    visit.id,
    visit.timeUnix,
  );

  return c.text("Your visitor id was " + id);
});

app.get("/stats", (c) => {
  const stmt = db.prepare("SELECT id, timeUnix FROM visits");

  const visits = stmt.values().map(([id, timeUnix]) => new Visit(id, timeUnix));

  return c.html(
    `<style>
      td,th {border: 1px solid gray; text-align: center}
      table {border-collapse: collapse}
    </style>
    <table>
      <tr>
        <th>Id</th>
        <th>Time (unix seconds)</th>
      </tr>
    ${
      visits.map((v) => `<tr><td>${v.id}</td><td>${v.timeUnix}</td></tr>`)
        .join("")
    }
      </table>
  `,
  );
});

export default app;
