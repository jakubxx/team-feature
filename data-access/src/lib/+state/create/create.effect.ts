import { Injectable } from '@angular/core';

import * as CreateActions from './create.actions';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { GlobeWsApiTeamService } from '@globe/globe-ws-api';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { GlobeUiToastService } from '@globe/globe-ui/globe-ui-toast';
import { GlobeUiToastType } from '@globe/globe-ui/models';

@Injectable()
export class CreateTeamEffects {
  onCreateTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateActions.createTeam),
      concatMap((action) =>
        this.globeWsApiTeamService.create(action.teamCreateCommand).pipe(
          map((response) =>
            CreateActions.createTeamSuccess({ teamDto: response })
          ),
          catchError((error) => of(CreateActions.createTeamFailure(error)))
        )
      )
    )
  );

  onCreateTeamSuccessShowToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CreateActions.createTeamSuccess),
        tap(() => {
          this.toastService.showToast({
            type: GlobeUiToastType.Success,
            message: this.translateService.instant('teams.created'),
          });
        })
      ),
    {
      dispatch: false,
    }
  );

  onCreateTeamSuccessNavigateToList$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CreateActions.createTeamSuccess),
        tap(() => {
          this.router.navigate(['teams']);
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
    private globeWsApiTeamService: GlobeWsApiTeamService
  ) {}
}
