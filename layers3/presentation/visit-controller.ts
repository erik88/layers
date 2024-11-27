import { Hono } from "@hono/hono";
import { VisitService } from "../service/visit-service.ts";
import { visitTableTemplate } from "./visit-table-template.ts";

export class VisitController {
  #visitService: VisitService;

  constructor(visitService: VisitService) {
    this.#visitService = visitService;
  }

  registerEndpoints(app: Hono) {
    app.get("/", (c) => {
      const id = this.#visitService.addVisit();

      return c.text("Your visitor id was " + id);
    });

    app.get("/stats", (c) => {
      const visits = this.#visitService.getAllVisits();
      const html = visitTableTemplate(visits);

      return c.html(html);
    });
  }
}
