export interface CreateGoalsFormFields {
  title: string;
  description?: string;
  timesToComplete: {
    start: number;
    end: number;
    step: number;
    current: number;
  };
}
