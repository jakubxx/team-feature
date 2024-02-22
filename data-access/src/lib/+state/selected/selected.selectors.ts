import { createSelector } from '@ngrx/store';
import { selectTeamState } from '../team.selectors';
import * as fromSelected from './selected.reducer';

export const selectTeamSelectedState = createSelector(
  selectTeamState,
  (state) => state[fromSelected.featureKey] as fromSelected.State
);

export const getIsLoading = createSelector(
  selectTeamSelectedState,
  (state) => state.isLoading
);

export const getTeam = createSelector(
  selectTeamSelectedState,
  (state) => state.data
);

export const getTeamId = createSelector(
  selectTeamSelectedState,
  (state) => state.selectedId
);

export const getIsLoaded = createSelector(
  selectTeamSelectedState,
  (state) => state.isLoaded
);
