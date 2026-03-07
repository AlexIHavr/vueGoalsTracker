export interface CreateGoalsFormTimesFields {
  timesStart?: number;
  timesEnd?: number;
  timesStep?: number;
}

export interface CreateGoalsFormFields extends CreateGoalsFormTimesFields {
  title: string;
  description?: string;
  timesSuffix?: string;
}
