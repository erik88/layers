import { VisitRepository } from "../infrastructure/visit-repository.ts";
import { Visit } from "./visit.ts";

export class VisitService {
  #visitRepository: VisitRepository;

  constructor(visitRepository: VisitRepository) {
    this.#visitRepository = visitRepository;
  }

  addVisit(): number {
    const now = Temporal.Now.instant();
    const id = Math.floor(Math.random() * 2_000_000_000);

    this.#visitRepository.addVisit(new Visit(id, now));

    return id;
  }

  getAllVisits(): Visit[] {
    return this.#visitRepository.getAllVisits();
  }
}
