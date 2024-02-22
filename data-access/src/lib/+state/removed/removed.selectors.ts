import { createSelector } from '@ngrx/store';
import { selectTeamState } from '../team.selectors';
import * as fromRemoved from './removed.reducer';

export const selectRemovedTeamState = createSelector(
  selectTeamState,
  (state) => state[fromRemoved.featureKey] as fromRemoved.State
);

export const getIsLoading = createSelector(
  selectRemovedTeamState,
  (state) => state.isLoading
);

export const getSelectRoleId = createSelector(
  selectRemovedTeamState,
  (state) => state.id
);
