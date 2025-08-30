import { mockCandidates } from "../lib/mockCandidates";
import { Candidate } from "../types/types";

export class CandidateService {
  public async getCandidates(): Promise<Candidate[]> {
    return new Promise((resolve) => {
      resolve(mockCandidates);
    });
  }
}

export const { getCandidates } = new CandidateService();
