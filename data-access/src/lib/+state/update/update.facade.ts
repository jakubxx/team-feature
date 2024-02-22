import { Injectable } from '@angular/core';
import { TeamUpdateCommand } from '@globe/globe-ws-api';
import { Store } from '@ngrx/store';
import * as UpdateActions from './update.actions';
import { getIsLoading } from './update.selectors';

@Injectable({ providedIn: 'root' })
export class teamUpdateFacade {
  constructor(private readonly store: Store) {}

  get isLoading$() {
    return this.store.select(getIsLoading);
  }

  updateTeam(teamUpdateCommand: TeamUpdateCommand) {
    this.store.dispatch(UpdateActions.updateTeam({ teamUpdateCommand }));
  }
}
