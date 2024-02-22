import { createAction, props } from '@ngrx/store';
import { prefix as teamPrefix } from './../team.actions';
import { TeamDto } from '@globe/globe-ws-api';

export const prefix = `${teamPrefix}[Selected]`;

export const selectedTeam = createAction(
  `${prefix} Select Team`,
  props<{ teamId: TeamDto['id'] }>()
);

export const selectedTeamSuccess = createAction(
  `${prefix} Select Team Success`,
  props<{ teamId: TeamDto['id'] }>()
);

export const alreadySelectedTeam = createAction(
  `${prefix} Already Selected Team`
);

export const loadTeam = createAction(
  `${prefix} Load Team`,
  props<{ teamId: TeamDto['id'] }>()
);

export const reloadTeam = createAction(
  `${prefix} Reload Team`,
  props<{ teamId: TeamDto['id'] }>()
);

export const reloadTeamSuccess = createAction(
  `${prefix} Reload Team Succeess`,
  props<{ data: TeamDto }>()
);

export const reloadTeamFailure = createAction(
  `${prefix} Reload Team Failure`,
  props<{ error: unknown }>()
);
