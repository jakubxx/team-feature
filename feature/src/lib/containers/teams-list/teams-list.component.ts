import { Component, ViewChild } from '@angular/core';
import { GlobeIcon } from '@globe/globe-ui/globe-ui-icon';
import {
  Privileges,
  GlobeWsApiTeamService,
  TeamBasicDto,
  FilterQuery,
} from '@globe/globe-ws-api';
import {
  GlobeUiPageListComponent,
  ListPageDataSource,
} from '@globe/globe-ui/globe-ui-pages';
import { ColDef } from 'ag-grid-community';
import { GlobePrivilegeService } from '@globe/shared/privilege/utils';
import {
  IActionEvent,
  IActionItem,
} from '@globe/globe-ui/globe-ui-action-list';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import { TeamRemovedFacade } from '@globe/shared/team/data-access';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ConfigurationFacade } from '@globe/shared/configuration/data-access';
import { GlobeUiDatatableExporterService } from '@globe/globe-ui/globe-ui-datatable';

type ListItemRow = TeamBasicDto;

@UntilDestroy()
@Component({
  selector: 'globe-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.scss'],
})
export class TeamsListComponent {
  GlobeUiIcon = GlobeIcon;
  Privileges = Privileges;

  private _globeUiPageListComponent!: GlobeUiPageListComponent;

  @ViewChild(GlobeUiPageListComponent) set globeUiPageListComponent(
    globeUiPageListComponent: GlobeUiPageListComponent
  ) {
    this._globeUiPageListComponent = globeUiPageListComponent;
  }

  actions$: Observable<IActionItem<TeamBasicDto>[]> = combineLatest([
    this.globePrivilegeService.hasAllPrivileges([Privileges.CanUpdateTeam]),
    this.globePrivilegeService.hasAllPrivileges([Privileges.CanDeleteTeam]),
  ]).pipe(
    map(([canUpdate, canDelete]) => {
      const actions: IActionItem<TeamBasicDto>[] = [];
      if (canUpdate) {
        actions.push({
          label: 'common.edit',
          icon: GlobeIcon.UI_PENCIL,
          linkGenerator: (row) => `./${row.id}/edit`,
        });
      }

      if (canDelete) {
        actions.push({
          label: 'common.delete',
          icon: GlobeIcon.UI_TRASH,
          name: 'delete',
        });
      }

      return actions;
    })
  );

  columns: ColDef[] = [
    {
      field: 'id',
      headerName: 'Id',
    },
    {
      field: 'name',
      headerName: 'common.fields.name',
    },
  ];

  constructor(
    private configurationFacade: ConfigurationFacade,
    private globeUiDatatableExporterService: GlobeUiDatatableExporterService,
    private teamRemovedFacade: TeamRemovedFacade,
    private globeWsApiTeamService: GlobeWsApiTeamService,
    private globePrivilegeService: GlobePrivilegeService
  ) {}

  dataSource: ListPageDataSource<TeamBasicDto> = (query) => {
    return this.globeWsApiTeamService.list(query);
  };

  onAction(event: IActionEvent<TeamBasicDto>) {
    if (event.name === 'delete') {
      this.onTeamDelete(event.data.id);
    }
  }

  onTeamDelete(teamId: ListItemRow['id']) {
    this.teamRemovedFacade
      .removedTeam(teamId)
      .pipe(
        filter((value) => value.success),
        untilDestroyed(this)
      )
      .subscribe(() => {
        this._globeUiPageListComponent.reloadPageDate();
      });
  }

  onExport(query: FilterQuery) {
    this.dataSource(query)
      .pipe(
        withLatestFrom(
          this.configurationFacade.configuration$.pipe(
            map((config) => config?.csvSeparator)
          )
        )
      )
      .subscribe(([result, csvSeparator]) => {
        this.globeUiDatatableExporterService.downloadCsvFile(
          this._globeUiPageListComponent.uiDatatableComponent,
          result.items,
          csvSeparator ?? ',',
          `teams-list.csv`
        );
      });
  }

  rowLinkFn(row: ListItemRow) {
    return `./${row.id}`;
  }
}
