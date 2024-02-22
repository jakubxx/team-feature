import { Component, Input } from '@angular/core';
import { GlobeIcon } from '@globe/globe-ui/globe-ui-icon';
import { TeamDto } from '@globe/globe-ws-api';
import { ColDef } from 'ag-grid-community';

@Component({
  selector: 'globe-team-info',
  templateUrl: './team-info.component.html',
  styleUrls: ['./team-info.component.scss'],
})
export class TeamInfoComponent {
  _teamData: TeamDto | null = null;
  GlobeUiIcon = GlobeIcon;

  @Input()
  set teamData(teamData: TeamDto | null) {
    this._teamData = teamData;
  }
  get teamUsersData() {
    return this._teamData?.users ?? null;
  }

  columns: ColDef[] = [
    {
      field: 'firstName',
      headerName: 'teams.fields.firstName',
    },
    {
      field: 'lastName',
      headerName: 'teams.fields.lastName',
    },
    {
      field: 'corporateTitle',
      headerName: 'teams.fields.corporateTitle',
    },
    {
      field: 'email',
      headerName: 'teams.fields.email',
    },
    {
      field: 'phoneNumber',
      headerName: 'teams.fields.phone',
    },
  ];

  rowLinkFn = () => undefined;
}
