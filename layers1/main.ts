import { Hono } from "@hono/hono";
import { Database } from "jsr:@db/sqlite@0.11";

// Initialization
// ---------------------------------------

const app = new Hono();
const db = new Database(":memory:");
db.exec("CREATE TABLE visits(id INTEGER, timeUnixMs INTEGER)")


// Endpoints
// ---------------------------------------

app.get("/", (c) => {
  const now = Temporal.Now.instant().epochMilliseconds;
  const id = Math.floor(Math.random() * 2_000_000_000);
  db.exec("INSERT INTO visits (id, timeUnixMs) VALUES(?, ?)", id, now);

  return c.text("Your visitor id was "+id);
});

app.get("/stats", (c) => {
  const stmt = db.prepare("SELECT COUNT(*) as count FROM visits");
  const row = stmt.get() as { count: number };
  
  return c.text(`${row.count} visits so far!`);
});

export default app;