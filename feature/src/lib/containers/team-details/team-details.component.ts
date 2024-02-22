import { OnInit, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobeIcon } from '@globe/globe-ui/globe-ui-icon';
import {
  GlobeUiPageListComponent,
  ListPageDataSource,
} from '@globe/globe-ui/globe-ui-pages';
import {
  TeamSelectedFacade,
  TeamRemovedFacade,
} from '@globe/shared/team/data-access';
import { FilterQuery, Privileges, UserBasicDto } from '@globe/globe-ws-api';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ColDef } from 'ag-grid-community';
import { filter, map, take, withLatestFrom } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { isNil } from 'lodash';
import { ConfigurationFacade } from '@globe/shared/configuration/data-access';
import { GlobeUiDatatableExporterService } from '@globe/globe-ui/globe-ui-datatable';

type ListItemRow = UserBasicDto;

@UntilDestroy()
@Component({
  selector: 'globe-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.scss'],
})
export class TeamDetailsComponent implements OnInit {
  Privileges = Privileges;
  GlobeUiIcon = GlobeIcon;

  isLoading$ = combineLatest([
    this.teamSelectedFacade.isLoading$,
    this.teamRemovedFacade.isLoading$,
  ]).pipe(
    map(([isTeamLoading, isRemovedLoading]) => {
      return isTeamLoading || isRemovedLoading;
    })
  );

  private _globeUiPageListComponent!: GlobeUiPageListComponent;

  @ViewChild(GlobeUiPageListComponent) set globeUiPageListComponent(
    globeUiPageListComponent: GlobeUiPageListComponent
  ) {
    this._globeUiPageListComponent = globeUiPageListComponent;
  }

  team$ = this.teamSelectedFacade.team$;
  teamName: string | null = null;

  columnsDef: ColDef = {
    cellRendererParams: {
      customLinkGenerator: null,
    },
  };
  columns: ColDef[] = [
    {
      field: 'id',
      headerName: 'Id',
    },
    {
      field: 'firstName',
      headerName: 'teams.fields.firstName',
    },
    {
      field: 'lastName',
      headerName: 'teams.fields.lastName',
    },
    {
      field: 'phoneNumber',
      headerName: 'teams.fields.phone',
    },
    {
      field: 'corporateTitle',
      headerName: 'teams.fields.corporateTitle',
    },
  ];

  constructor(
    private configurationFacade: ConfigurationFacade,
    private globeUiDatatableExporterService: GlobeUiDatatableExporterService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private teamSelectedFacade: TeamSelectedFacade,
    private teamRemovedFacade: TeamRemovedFacade
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      ?.pipe(untilDestroyed(this))
      .subscribe((params) => {
        if (params.teamId) {
          this.teamSelectedFacade.selectTeam(parseInt(params.teamId));

          this.team$.pipe(untilDestroyed(this)).subscribe((team) => {
            if (team) {
              this.teamName = team.name;
            }
          });
        }
      });
  }

  async onDeleteTeam() {
    const teamId = await this.teamSelectedFacade.getSelectedTeamId$();

    this.teamRemovedFacade
      .removedTeam(teamId)
      .pipe(
        filter((value) => value.success),
        untilDestroyed(this)
      )
      .subscribe(() => {
        this.router.navigate(['teams']);
      });
  }

  dataSource: ListPageDataSource<ListItemRow> = () => {
    return this.team$.pipe(
      filter((team) => !isNil(team)),
      take(1),
      map((team) => {
        const users = team?.users;
        return {
          items: users as ListItemRow[],
          pageIndex: 0,
          pageSize: -1,
          totalCount: users?.length || 0,
        };
      })
    );
  };

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
          `team-details.csv`
        );
      });
  }

  rowLinkFn = () => undefined;
}
