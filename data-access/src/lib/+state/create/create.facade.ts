import { TeamCreateCommand } from '@globe/globe-ws-api';
import { Store } from '@ngrx/store';
import * as CreateActions from './create.actions';
import { getIsLoading } from './create.selectors';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CreateTeamFacade {
  constructor(private readonly store: Store) {}

  get isLoading$() {
    return this.store.select(getIsLoading);
  }

  createTeam(teamCreateCommand: TeamCreateCommand) {
    this.store.dispatch(CreateActions.createTeam({ teamCreateCommand }));
  }
}
