import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobeUiDatatableComponent } from '@globe/globe-ui/globe-ui-datatable';
import { GlobeIcon } from '@globe/globe-ui/globe-ui-icon';
import {
  GlobeUiPageListComponent,
  ListPageDataSource,
} from '@globe/globe-ui/globe-ui-pages';
import {
  GlobeWsApiUserService,
  Privileges,
  TeamDto,
  TeamUpdateCommand,
  UserBasicDto,
} from '@globe/globe-ws-api';
import {
  TeamSelectedFacade,
  teamUpdateFacade,
} from '@globe/shared/team/data-access';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ColDef } from 'ag-grid-community';
import { filter, take } from 'rxjs/operators';
import { customRequiredValidator, submitForm } from '@globe/shared/utils';

type ListItemRow = UserBasicDto;

@UntilDestroy()
@Component({
  selector: 'globe-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.scss'],
})
export class TeamEditComponent implements OnInit {
  GlobeUiIcon = GlobeIcon;
  Privileges = Privileges;

  teamData!: TeamDto;

  selectedRows: number[] = [];

  nameMinLength = 4;
  nameMaxLength = 50;

  formGroup = new FormGroup({
    name: new FormControl(null, [
      customRequiredValidator,
      Validators.minLength(this.nameMinLength),
      Validators.maxLength(this.nameMaxLength),
    ]),
  });

  columnsDef: ColDef = {
    cellRendererParams: {
      customLinkGenerator: null,
    },
  };

  isLoading$ = this.teamSelectedFacade.isLoading$;

  team$ = this.teamSelectedFacade.team$;

  columns: ColDef[] = [
    {
      field: 'id',
      headerName: 'Id',
    },
    {
      field: 'firstName',
      headerName: 'user.fields.firstName',
    },
    {
      field: 'lastName',
      headerName: 'user.fields.lastName',
    },
    {
      field: 'corporateTitle',
      headerName: 'user.fields.corporateTitle',
    },
    {
      field: 'email',
      headerName: 'user.fields.email',
    },
    {
      field: 'phoneNumber',
      headerName: 'user.fields.phoneNumber',
    },
  ];

  private _globeUiDatatableComponent: GlobeUiDatatableComponent<
    unknown,
    number
  > | null = null;
  @ViewChild(GlobeUiPageListComponent) set globeUiPageListComponent(
    globeUiPageListComponent: GlobeUiPageListComponent<unknown, number>
  ) {
    this._globeUiDatatableComponent =
      globeUiPageListComponent.uiDatatableComponent;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: GlobeWsApiUserService,
    private teamSelectedFacade: TeamSelectedFacade,
    private teamUpdateFacade: teamUpdateFacade
  ) {}

  dataSource: ListPageDataSource<ListItemRow> = (query) =>
    this.userService.list(query);

  ngOnInit(): void {
    this.activatedRoute.params
      ?.pipe(untilDestroyed(this))
      .subscribe((params) => {
        if (params.teamId) {
          this.teamSelectedFacade.selectTeam(parseInt(params.teamId));
        }
      });

    this.teamSelectedFacade.team$
      ?.pipe(
        filter((teamData) => teamData !== null),
        take(1),
        untilDestroyed(this)
      )
      .subscribe((teamData) => {
        this.teamData = teamData as TeamDto;
        this.formGroup.get('name')?.setValue(teamData?.name);

        const usersIds = teamData?.users?.map((user) => user.id) || [];

        if (this._globeUiDatatableComponent) {
          this._globeUiDatatableComponent.selectedValues = usersIds;
        }
      });
  }

  submitList() {
    submitForm(this.formGroup, () => {
      const usersIds = this._globeUiDatatableComponent?.selectedValues ?? [];

      const teamUpdateData: TeamUpdateCommand = {
        id: this.teamData.id,
        name: this.formGroup.get('name')?.value,
        users: usersIds,
      };

      this.teamUpdateFacade.updateTeam(teamUpdateData);
    });
  }

  selectWith(row: ListItemRow) {
    return row.id;
  }
}
