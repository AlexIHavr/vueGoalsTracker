import type {
  GoalFormFields,
  SwitchSettingsFields,
} from '../interfaces/goalFormFields';
import type { InjectionKey } from 'vue';

export const INITIAL_FIELDS_INJECT_KEY: InjectionKey<GoalFormFields> =
  Symbol('initialFields');
export const INITIAL_SWITCH_SETTINGS_INJECT_KEY: InjectionKey<SwitchSettingsFields> =
  Symbol('initialSwitchSettings');
