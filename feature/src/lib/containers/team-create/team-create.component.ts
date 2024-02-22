import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobeUiDatatableComponent } from '@globe/globe-ui/globe-ui-datatable';
import { GlobeIcon } from '@globe/globe-ui/globe-ui-icon';
import { CreateTeamFacade } from '@globe/shared/team/data-access';
import {
  GlobeUiPageListComponent,
  ListPageDataSource,
} from '@globe/globe-ui/globe-ui-pages';
import {
  GlobeWsApiUserService,
  Privileges,
  UserBasicDto,
} from '@globe/globe-ws-api';
import { customRequiredValidator, submitForm } from '@globe/shared/utils';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ColDef } from 'ag-grid-community';

type ListItemRow = UserBasicDto;

export interface FormData {
  name: string;
  users?: number[];
}

@UntilDestroy()
@Component({
  selector: 'globe-team-create',
  templateUrl: './team-create.component.html',
  styleUrls: ['./team-create.component.scss'],
})
export class TeamCreateComponent {
  GlobeUiIcon = GlobeIcon;
  Privileges = Privileges;

  selectedRows: number[] = [];

  columnsDef: ColDef = {
    cellRendererParams: {
      customLinkGenerator: null,
    },
  };

  nameMinLength = 4;
  nameMaxLength = 50;

  formGroup = new FormGroup({
    name: new FormControl(null, [
      customRequiredValidator,
      Validators.minLength(this.nameMinLength),
      Validators.maxLength(this.nameMaxLength),
    ]),
  });

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
    private userService: GlobeWsApiUserService,
    private createTeamFacade: CreateTeamFacade
  ) {}

  dataSource: ListPageDataSource<ListItemRow> = (query) =>
    this.userService.list(query);

  submitList() {
    submitForm(this.formGroup, (data: FormData) => {
      const usersIds = this._globeUiDatatableComponent?.selectedValues ?? [];

      const formData = {
        name: data.name,
        users: usersIds,
      };

      this.createTeamFacade.createTeam({
        ...formData,
      });
    });
  }

  selectWith(row: ListItemRow) {
    return row.id;
  }
}
