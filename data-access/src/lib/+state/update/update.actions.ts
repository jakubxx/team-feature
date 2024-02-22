import { createAction, props } from '@ngrx/store';
import { prefix as teamPrefix } from './../team.actions';
import { TeamDto, TeamUpdateCommand } from '@globe/globe-ws-api';

export const prefix = `${teamPrefix}[Update]`;

export const updateTeam = createAction(
  `${prefix} Update Team`,
  props<{ teamUpdateCommand: TeamUpdateCommand }>()
);

export const updateTeamSuccess = createAction(
  `${prefix} Update Team Success`,
  props<{ teamDto: TeamDto }>()
);

export const updateTeamFailure = createAction(
  `${prefix} Update Team Failure`,
  props<{ error: unknown }>()
);
