import type { Visit } from "../domain/visit.ts";

export interface IVisitRepository {
    addVisit(visit: Visit): void;
    getAllVisits(): Visit[];
}
