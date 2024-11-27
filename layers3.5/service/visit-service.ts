import { Visit } from "../domain/visit.ts";
import { IVisitRepository } from "../service-interfaces/i-visit-repository.ts";

export class VisitService {
  #visitRepository: IVisitRepository;

  constructor(visitRepository: IVisitRepository) {
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
