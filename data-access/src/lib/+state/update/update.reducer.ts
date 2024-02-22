import { TeamUpdateCommand } from '@globe/globe-ws-api';
import { ICreateEntityState } from '@globe/shared/utils';
import { createReducer, on } from '@ngrx/store';
import {
  updateTeam,
  updateTeamFailure,
  updateTeamSuccess,
} from './update.actions';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface State extends ICreateEntityState<TeamUpdateCommand> {}

export const featureKey = 'update';

const initialState: State = {
  isLoading: false,
  command: null,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(updateTeam, (state, action) => ({
    ...state,
    command: action.teamUpdateCommand,
    isLoading: true,
  })),
  on(updateTeamSuccess, updateTeamFailure, (state) => ({
    ...state,
    command: null,
    isLoading: false,
  }))
);
