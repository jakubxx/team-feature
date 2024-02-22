import { TeamDetailsComponent } from './team-details.component';
import { SharedTeamFeatureModule } from '../../shared-team-feature.module';
import { MockBuilder, MockRender } from 'ng-mocks';
import { RouterModule } from '@angular/router';

describe('TeamDetailsComponent', () => {
  beforeEach(() => {
    return MockBuilder(TeamDetailsComponent, [
      SharedTeamFeatureModule,
      RouterModule.forRoot([]),
    ]);
  });

  it('TeamDetailsComponent', () => {
    const fixture = MockRender(TeamDetailsComponent);
    const component = fixture.point.componentInstance;
    expect(component).toBeTruthy();
  });
});
