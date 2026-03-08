export interface CreateGoalsFormTimesFields {
  timesStart: number | null;
  timesEnd: number | null;
  timesStep: number | null;
}

export interface CreateGoalsFormFields extends CreateGoalsFormTimesFields {
  title: string;
  description?: string;
  timesSuffix?: string;
  startDate: Date;
  endDate: Date;
}
