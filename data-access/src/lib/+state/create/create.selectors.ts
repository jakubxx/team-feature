import { createSelector } from '@ngrx/store';
import * as fromCreate from './create.reducer';
import { selectTeamState } from '../team.selectors';

export const selectCreateTeam = createSelector(
  selectTeamState,
  (state) => state[fromCreate.featureKey] as fromCreate.State
);

export const getIsLoading = createSelector(
  selectCreateTeam,
  (state) => state.isLoading
);
