export interface CreateGoalsFormNumberFields {
  timesStart: number | null;
  timesEnd: number | null;
  timesStep: number | null;
  startDay: number | null;
  endDay: number | null;
}

export interface CreateGoalsFormFields extends CreateGoalsFormNumberFields {
  title: string;
  description?: string;
  timesSuffix?: string;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
}
