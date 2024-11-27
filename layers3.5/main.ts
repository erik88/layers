import { Hono } from "@hono/hono";
import { VisitRepository } from "./infrastructure/visit-repository.ts";
import { VisitService } from "./service/visit-service.ts";
import { VisitController } from "./presentation/visit-controller.ts";

const app = new Hono();

const visitRepository = new VisitRepository();
const visitService = new VisitService(visitRepository);
const visitController = new VisitController(visitService);
visitController.registerEndpoints(app);

export default app;
