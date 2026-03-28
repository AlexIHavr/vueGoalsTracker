export interface GoalFormNumberFields {
  timesStart: number;
  timesEnd: number;
  timesStep: number;
  startDay: number;
  endDay: number;
}

export interface GoalFormFields extends GoalFormNumberFields {
  title: string;
  description: string;
  category: string;
  timesSuffix: string;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
}

export interface SwitchSettingsFields {
  showOneTimes: boolean;
  overTimes: boolean;
}
