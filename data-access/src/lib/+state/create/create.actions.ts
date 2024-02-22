import { createAction, props } from '@ngrx/store';
import { prefix as teamPrefix } from './../team.actions';
import { TeamCreateCommand, TeamDto } from '@globe/globe-ws-api';

export const prefix = `${teamPrefix}[Create]`;

export const createTeam = createAction(
  `${prefix} Create Team`,
  props<{ teamCreateCommand: TeamCreateCommand }>()
);

export const createTeamSuccess = createAction(
  `${prefix} Create Team Success`,
  props<{ teamDto: TeamDto }>()
);

export const createTeamFailure = createAction(
  `${prefix} Create Team Failure`,
  props<{ error: unknown }>()
);
