import { TeamEditComponent } from './team-edit.component';
import { SharedTeamFeatureModule } from '../../shared-team-feature.module';
import { MockBuilder, MockRender } from 'ng-mocks';
import { RouterModule } from '@angular/router';

describe('TeamEditComponent', () => {
  beforeEach(() => {
    return MockBuilder(TeamEditComponent, [
      SharedTeamFeatureModule,
      RouterModule.forRoot([]),
    ]);
  });

  it('TeamEditComponent', () => {
    const fixture = MockRender(TeamEditComponent);
    const component = fixture.point.componentInstance;
    expect(component).toBeTruthy();
  });
});
