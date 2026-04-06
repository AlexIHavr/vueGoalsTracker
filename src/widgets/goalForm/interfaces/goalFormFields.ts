export interface GoalFormFields {
  title: string;
  description: string;
  category: string;
  timesSuffix: string;
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
  timesStart: number | null;
  timesEnd: number | null;
  timesStep: number | null;
  startDay: number | null;
  endDay: number | null;
}

export interface SwitchSettingsFields {
  isShowOneTimes: boolean;
  isOverTimes: boolean;
}
