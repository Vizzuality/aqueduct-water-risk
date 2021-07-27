import { createAction } from 'redux-tools';

export const setFilters = createAction('SETTINGS__SET-FILTERS');
export const setTabFilters = createAction('SETTINGS__SET-TAB-FILTERS');
export const setPonderation = createAction('SETTINGS__SET-PONDERATION');
export const setAnalyzerOpen = createAction('SETTINGS__SET-ANALYZER-OPEN');

export default {
  setFilters,
  setTabFilters,
  setPonderation,
  setAnalyzerOpen
};
