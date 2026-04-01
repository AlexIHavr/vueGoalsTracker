import type { GoalFormFields, SwitchSettingsFields } from './goalFormFields';
import type { BaseFormExpose } from 'features/baseForm';

export interface GoalFormExpose {
  readonly goalFormRef: BaseFormExpose | null;
  goalFormFields: GoalFormFields;
  switchSettingsFields: SwitchSettingsFields;
  readonly resetGoalForm: () => void;
}
