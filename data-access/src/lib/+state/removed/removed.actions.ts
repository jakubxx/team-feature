import { createAction, props } from '@ngrx/store';
import { prefix as teamPrefix } from './../team.actions';
import { TeamDto } from '@globe/globe-ws-api';

export const prefix = `${teamPrefix}[Removed]`;

export const removeTeam = createAction(
  `${prefix} Remove Team`,
  props<{ teamId: TeamDto['id'] }>()
);

export const removeTeamConfirmed = createAction(
  `${prefix} Remove Team Confirm`,
  props<{ teamId: TeamDto['id'] }>()
);

export const removeTeamCanceled = createAction(
  `${prefix} Remove Team Cancel`,
  props<{ teamId: TeamDto['id'] }>()
);

export const removeTeamSuccess = createAction(
  `${prefix} Remove Team Success`,
  props<{ teamId: TeamDto['id'] }>()
);

export const removeTeamFailure = createAction(
  `${prefix} Remove Team Failure`,
  props<{ error: unknown }>()
);
