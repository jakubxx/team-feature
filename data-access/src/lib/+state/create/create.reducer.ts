import { TeamCreateCommand } from '@globe/globe-ws-api';
import { ICreateEntityState } from '@globe/shared/utils';
import { createReducer, on } from '@ngrx/store';
import { createTeam } from './create.actions';
import { createTeamSuccess } from './create.actions';
import { createTeamFailure } from './create.actions';

export const featureKey = 'create';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface State extends ICreateEntityState<TeamCreateCommand> {}

export const initialState: State = {
  isLoading: false,
  command: null,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(createTeam, (state, action) => ({
    ...state,
    command: action.teamCreateCommand,
    isLoading: true,
  })),
  on(createTeamSuccess, createTeamFailure, (state) => ({
    ...state,
    command: null,
    isLoading: false,
  }))
);
