import { Injectable } from '@angular/core';
import { GlobeWsApiTeamService } from '@globe/globe-ws-api';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as SelectedActions from './selected.actions';
import { catchError, concatMap, map, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { getTeamId, getIsLoaded } from './selected.selectors';

@Injectable()
export class SelectedTeamEffects {
  selectTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SelectedActions.selectedTeam),
      withLatestFrom(this.store.select(getTeamId)),
      map(([action, selectedTeamId]) => {
        if (action.teamId !== selectedTeamId) {
          return SelectedActions.selectedTeamSuccess({
            teamId: action.teamId,
          });
        } else {
          return SelectedActions.alreadySelectedTeam();
        }
      })
    )
  );

  selectTeamSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SelectedActions.selectedTeamSuccess),
      map((action) => {
        return SelectedActions.loadTeam({
          teamId: action.teamId,
        });
      })
    )
  );

  loadTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SelectedActions.loadTeam),
      withLatestFrom(this.store.select(getIsLoaded)),
      map(([action, isLoaded]) => {
        if (isLoaded) {
          return SelectedActions.alreadySelectedTeam();
        } else {
          return SelectedActions.reloadTeam({
            teamId: action.teamId,
          });
        }
      })
    )
  );

  reloadTeam = createEffect(() =>
    this.actions$.pipe(
      ofType(SelectedActions.reloadTeam),
      concatMap((action) =>
        this.teamService.get({ id: action.teamId }).pipe(
          map((data) => SelectedActions.reloadTeamSuccess({ data })),
          catchError((error) =>
            of(SelectedActions.reloadTeamFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private teamService: GlobeWsApiTeamService,
    private store: Store
  ) {}
}
