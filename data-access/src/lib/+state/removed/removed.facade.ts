import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { getIsLoading } from './removed.selectors';
import { TeamDto } from '@globe/globe-ws-api';
import { ConnectableObservable, Observable, merge } from 'rxjs';
import { IEntityActionResponse } from '@globe/shared/utils';
import * as RemovedActions from './removed.actions';
import { first, publish, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TeamRemovedFacade {
  get isLoading$() {
    return this.store.select(getIsLoading);
  }

  constructor(
    private readonly store: Store,
    private readonly actions$: Actions
  ) {}

  removedTeam(
    teamId: TeamDto['id']
  ): Observable<IEntityActionResponse<TeamDto, 'id'>> {
    const removedFailed = this.actions$.pipe(
      ofType(
        RemovedActions.removeTeamCanceled,
        RemovedActions.removeTeamFailure
      ),
      map(() => ({ success: false, id: teamId }))
    );

    const removedSuccess = this.actions$.pipe(
      ofType(RemovedActions.removeTeamSuccess),
      map(() => ({ success: true, id: teamId }))
    );

    const result = merge(removedFailed, removedSuccess).pipe(
      first(),
      publish()
    ) as ConnectableObservable<IEntityActionResponse<TeamDto, 'id'>>;
    result.connect();

    this.store.dispatch(RemovedActions.removeTeam({ teamId }));

    return result;
  }
}
