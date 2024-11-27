import { Hono } from "@hono/hono";
import { VisitRepository } from "../infrastructure/visit-repository.ts";
import { Visit } from "./visit.ts";

// Initialization
// ---------------------------------------

const app = new Hono();
const visitRepository = new VisitRepository();

// Endpoints
// ---------------------------------------

app.get("/", (c) => {
  const now = Temporal.Now.instant();
  const id = Math.floor(Math.random() * 2_000_000_000);

  visitRepository.addVisit(new Visit(id, now));

  return c.text("Your visitor id was " + id);
});

app.get("/stats", (c) => {
  const visits = visitRepository.getAllVisits();

  return c.html(
    `<style>
      td,th {border: 1px solid gray; text-align: center}
      table {border-collapse: collapse}
    </style>
    <table>
      <tr>
        <th>Id</th>
        <th>Time</th>
      </tr>
    ${
      visits.map((v) =>
        `<tr><td>${v.id}</td><td>${v.time.toLocaleString()}</td></tr>`
      )
        .join("")
    }
      </table>
  `,
  );
});

export default app;
