import { mockInterviews } from "../lib/mockInterviews";
import { InterviewItem } from "./interviewItem";

export const InterviewList = () => {
  return mockInterviews.map((interview) => (
    <InterviewItem interview={interview} />
  ));
};
