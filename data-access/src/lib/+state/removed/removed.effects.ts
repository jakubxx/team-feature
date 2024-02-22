import { Injectable } from '@angular/core';
import { GlobeWsApiTeamService } from '@globe/globe-ws-api';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { catchError, concatMap, map, tap } from 'rxjs/operators';
import * as RemovedActions from './removed.actions';
import { of } from 'rxjs';
import {
  GlobeUiDialog,
  DialogRemovalComponent,
} from '@globe/globe-ui/globe-ui-dialog';
import { GlobeUiToastService } from '@globe/globe-ui/globe-ui-toast';
import { GlobeUiToastType } from '@globe/globe-ui/models';

@Injectable()
export class RemovedTeamEffects {
  constructor(
    private actions$: Actions,
    private toastService: GlobeUiToastService,
    private translateService: TranslateService,
    private globeUiDialog: GlobeUiDialog,
    private teamSerivice: GlobeWsApiTeamService
  ) {}

  onRemoveTeam$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RemovedActions.removeTeam),
      concatMap((action) =>
        this.globeUiDialog
          .open(DialogRemovalComponent, {
            data: this.translateService.instant('teams.confirmDeleteText'),
          })
          .pipe(
            map((dialogResult) => ({
              ...dialogResult,
              teamId: action.teamId,
            }))
          )
      ),
      map((extendedDialogResult) => {
        if (extendedDialogResult.result === 'confirm') {
          return RemovedActions.removeTeamConfirmed({
            teamId: extendedDialogResult.teamId,
          });
        } else {
          return RemovedActions.removeTeamCanceled({
            teamId: extendedDialogResult.teamId,
          });
        }
      })
    )
  );

  onRemoveTeamConfirmed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RemovedActions.removeTeamConfirmed),
      concatMap((action) =>
        this.teamSerivice.delete({ id: action.teamId }).pipe(
          map(() =>
            RemovedActions.removeTeamSuccess({
              teamId: action.teamId,
            })
          ),
          catchError((error) => of(RemovedActions.removeTeamFailure({ error })))
        )
      )
    )
  );

  onDeleteSuccessShowToast$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(RemovedActions.removeTeamSuccess),
        tap(() => {
          this.toastService.showToast({
            type: GlobeUiToastType.Success,
            message: this.translateService.instant('teams.deleted'),
          });
        })
      ),
    {
      dispatch: false,
    }
  );
}
