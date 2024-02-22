import { createSelector } from '@ngrx/store';
import { selectTeamState } from '../team.selectors';
import * as fromUpdate from './update.reducer';

export const selectUpdateTeamState = createSelector(
  selectTeamState,
  (state) => state[fromUpdate.featureKey] as fromUpdate.State
);

export const getIsLoading = createSelector(
  selectUpdateTeamState,
  (state) => state.isLoading
);
