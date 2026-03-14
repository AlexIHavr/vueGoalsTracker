export interface CreateGoalsFormNumberFields {
  timesStart: number;
  timesEnd: number;
  timesStep: number;
  startDay: number;
  endDay: number;
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
