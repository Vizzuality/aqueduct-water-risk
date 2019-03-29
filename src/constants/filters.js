
export const TIMEFRAME_OPTIONS = [
  { value: 'baseline', label: 'Baseline' },
  { value: '2030', label: '2030' },
  { value: '2040', label: '2040' }
];

export const timeScaleOptions = [
  { value: 'annual', label: 'Annual' },
  { value: 'monthly', label: 'Monthly' }
];

export const MONTH_OPTIONS = [
  { value: '1', label: 'January' },
  { value: '2', label: 'Feburary' },
  { value: '3', label: 'March' },
  { value: '4', label: 'April' },
  { value: '5', label: 'May' },
  { value: '6', label: 'June' },
  { value: '7', label: 'July' },
  { value: '8', label: 'August' },
  { value: '9', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' }
];

export const projectionOptions = [
  { value: 'absolute', label: 'Absolute value' },
  { value: 'bs', label: 'Change from baseline' }
];

export const TIMEFRAME_MODAL_DESCRIPTION = {
  title: 'Time Scale',
  description: 'Depending on the time scale selection, different indicators will be available.'
};

export default {
  TIMEFRAME_OPTIONS,
  timeScaleOptions,
  MONTH_OPTIONS,
  projectionOptions,
  TIMEFRAME_MODAL_DESCRIPTION
};
