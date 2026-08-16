import { createContext } from 'react';

export type ButtonGroupContextValue = {
  attached: boolean;
  disabled: boolean;
  fullWidth: boolean;
  orientation: 'horizontal' | 'vertical';
};

export const ButtonGroupContext = createContext<ButtonGroupContextValue>({
  attached: false,
  disabled: false,
  fullWidth: false,
  orientation: 'horizontal'
});
