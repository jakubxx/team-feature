import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsListComponent } from './containers/teams-list/teams-list.component';
import { Route, RouterModule } from '@angular/router';
import {
  GlobePrivilegeGuard,
  PrivilegeRouteData,
  SharedPrivilegeUtilsModule,
} from '@globe/shared/privilege/utils';
import { Privileges } from '@globe/globe-ws-api';
import { FlexModule } from '@angular/flex-layout';
import { GlobeUiButtonModule } from '@globe/globe-ui/globe-ui-button';
import { GlobeUiPagesModule } from '@globe/globe-ui/globe-ui-pages';
import { TranslateModule } from '@ngx-translate/core';
import { GlobeUiNavbarModule } from '@globe/globe-ui/globe-ui-navbar';
import { GlobeUiIconModule } from '@globe/globe-ui/globe-ui-icon';
import { TeamDetailsComponent } from './containers/team-details/team-details.component';
import { GlobeUiLoaderModule } from '@globe/globe-ui/globe-ui-loader';
import { TeamInfoComponent } from './components/team-info/team-info.component';
import { GlobeUiDatatableModule } from '@globe/globe-ui/globe-ui-datatable';
import { TeamCreateComponent } from './containers/team-create/team-create.component';
import { GlobeUiFormFieldModule } from '@globe/globe-ui/globe-ui-form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { TeamEditComponent } from './containers/team-edit/team-edit.component';
import { GlobeUiCardsModule } from '@globe/globe-ui/globe-ui-cards';

export const sharedTeamFeatureRoutes: Route[] = [
  {
    path: '',
    component: TeamsListComponent,
    data: {
      allPrivileges: [Privileges.CanReadTeam],
    } as PrivilegeRouteData,
    canActivate: [GlobePrivilegeGuard],
  },
  {
    path: 'create',
    component: TeamCreateComponent,
    data: {
      allPrivileges: [Privileges.CanCreateTeam, Privileges.CanReadUser],
    } as PrivilegeRouteData,
    canActivate: [GlobePrivilegeGuard],
  },
  {
    path: ':teamId',
    component: TeamDetailsComponent,
    data: {
      allPrivileges: [Privileges.CanReadTeam, Privileges.CanReadUser],
    } as PrivilegeRouteData,
    canActivate: [GlobePrivilegeGuard],
  },
  {
    path: ':teamId/edit',
    component: TeamEditComponent,
    data: {
      allPrivileges: [Privileges.CanUpdateTeam, Privileges.CanReadUser],
    } as PrivilegeRouteData,
    canActivate: [GlobePrivilegeGuard],
  },
  { path: '**', redirectTo: 'teams' },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(sharedTeamFeatureRoutes),
    FlexModule,
    GlobeUiButtonModule,
    GlobeUiPagesModule,
    SharedPrivilegeUtilsModule,
    TranslateModule,
    GlobeUiIconModule,
    GlobeUiLoaderModule,
    GlobeUiDatatableModule,
    ReactiveFormsModule,
    GlobeUiFormFieldModule,
    GlobeUiNavbarModule,
    GlobeUiCardsModule,
  ],
  declarations: [
    TeamsListComponent,
    TeamDetailsComponent,
    TeamInfoComponent,
    TeamCreateComponent,
    TeamEditComponent,
  ],
})
export class SharedTeamFeatureModule {}
