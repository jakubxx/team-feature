import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromTeam from './+state/team.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CreateTeamEffects } from './+state/create/create.effect';
import { RemovedTeamEffects } from './+state/removed/removed.effects';
import { UpdateTeamEffects } from './+state/update/update.effects';
import { SelectedTeamEffects } from './+state/selected/selected.effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(fromTeam.featureKey, fromTeam.reducer),
    EffectsModule.forFeature([
      RemovedTeamEffects,
      UpdateTeamEffects,
      CreateTeamEffects,
      SelectedTeamEffects,
    ]),
  ],
})
export class SharedTeamDataAccessModule {}
