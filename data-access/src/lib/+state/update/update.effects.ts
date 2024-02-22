import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GlobeUiToastService } from '@globe/globe-ui/globe-ui-toast';
import { GlobeUiToastType } from '@globe/globe-ui/models';
import { GlobeWsApiTeamService } from '@globe/globe-ws-api';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import * as UpdateActions from './update.actions';

@Injectable()
export class UpdateTeamEffects {
  onTeamUpdate$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateActions.updateTeam),
      concatMap((action) =>
        this.teamService.update(action.teamUpdateCommand).pipe(
          map((response) =>
            UpdateActions.updateTeamSuccess({ teamDto: response })
          ),
          catchError((error) => of(UpdateActions.updateTeamFailure(error)))
        )
      )
    )
  );

  onUpdateTeamSuccessShowToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UpdateActions.updateTeamSuccess),
        tap(() => {
          this.toastService.showToast({
            type: GlobeUiToastType.Success,
            message: this.translateService.instant('teams.updated'),
          });
        })
      ),
    {
      dispatch: false,
    }
  );

  onUpdateTeamSuccessNavigateToDetails$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UpdateActions.updateTeamSuccess),
        tap((response) => {
          this.router.navigate(['teams', response.teamDto.id.toString()]);
        })
      ),
    {
      dispatch: false,
    }
  );

  constructor(
    private router: Router,
    private actions$: Actions,
    private toastService: GlobeUiToastService,
    private translateService: TranslateService,
    private teamService: GlobeWsApiTeamService
  ) {}
}
