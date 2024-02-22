import { Injectable } from '@angular/core';
import { TeamBasicDto, TeamDto } from '@globe/globe-ws-api';
import { Store } from '@ngrx/store';
import * as SelectedActions from './selected.actions';
import { getTeam, getIsLoading } from './selected.selectors';
import { filter, map, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TeamSelectedFacade {
  selectTeam(teamId: TeamBasicDto['id']) {
    this.store.dispatch(SelectedActions.selectedTeam({ teamId }));
  }

  get team$() {
    return this.store.select(getTeam);
  }

  async getSelectedTeamId$() {
    return await this.team$
      .pipe(
        filter((team) => team !== undefined && team !== null),
        map((team) => (team as TeamDto).id),
        take(1)
      )
      .toPromise();
  }

  get isLoading$() {
    return this.store.select(getIsLoading);
  }

  constructor(private readonly store: Store) {}
}
