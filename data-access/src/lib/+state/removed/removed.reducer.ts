import { TeamDto } from '@globe/globe-ws-api';
import { IRemovedEntityState } from '@globe/shared/utils';
import { createReducer, on } from '@ngrx/store';
import {
  removeTeam,
  removeTeamCanceled,
  removeTeamConfirmed,
  removeTeamFailure,
  removeTeamSuccess,
} from './removed.actions';

export const featureKey = 'removed';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface State extends IRemovedEntityState<TeamDto, 'id'> {}

const initialState: State = {
  id: null,
  isLoading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(removeTeam, (state, action) => ({
    ...state,
    id: action.teamId,
  })),
  on(removeTeamConfirmed, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(removeTeamCanceled, removeTeamSuccess, (state) => ({
    ...state,
    isLoading: false,
    id: null,
  })),
  on(removeTeamFailure, (state) => ({
    ...state,
    isLoading: false,
    id: null,
  }))
);
