import { mockInterviews } from "../lib/mockInterviews";
import { Interview } from "../types/types";

class InterviewService {
  public getInterviewsHistory(): Promise<Interview[]> {
    return new Promise((resolve) => resolve(mockInterviews));
  }
}

export const { getInterviewsHistory } = new InterviewService();
