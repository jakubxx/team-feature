import { TeamDto } from '@globe/globe-ws-api';
import { ISelectedEntityState } from '@globe/shared/utils';
import { createReducer, on } from '@ngrx/store';
import {
  reloadTeam,
  reloadTeamFailure,
  reloadTeamSuccess,
  selectedTeam,
} from './selected.actions';
import produce from 'immer';

export const featureKey = 'selected';

export type State = ISelectedEntityState<TeamDto, 'id'>;

const initialState: State = {
  isLoading: false,
  isLoaded: false,
  selectedId: null,
  error: null,
  data: null,
};

export const redcuer = createReducer(
  initialState,
  on(selectedTeam, (action) => ({
    ...initialState,
    selectedId: action.selectedId,
  })),
  on(reloadTeam, (state) =>
    produce(state, (newState) => {
      newState.isLoaded = true;
    })
  ),
  on(reloadTeamSuccess, (state, action) =>
    produce(state, (newState) => {
      newState.isLoading = false;
      newState.isLoaded = true;
      newState.data = action.data;
    })
  ),
  on(reloadTeamFailure, (state) =>
    produce(state, (newState) => {
      newState.isLoading = false;
    })
  )
);
