import { createAction } from 'redux-tools';

export const setFilters = createAction('MAP-VIEW-TAB__SET-FILTERS');
export const setPonderation = createAction('MAP-VIEW-TAB__SET-PONDERATION');

export default {
  setFilters,
  setPonderation
};
