import { MockBuilder, MockRender } from 'ng-mocks';
import { SharedTeamFeatureModule } from '../../shared-team-feature.module';
import { TeamInfoComponent } from './team-info.component';

describe('TeamInfoComponent', () => {
  beforeEach(() => {
    return MockBuilder(TeamInfoComponent, SharedTeamFeatureModule);
  });

  it('TeamInfoComponent', () => {
    const fixture = MockRender(TeamInfoComponent);
    const component = fixture.point.componentInstance;
    expect(component).toBeTruthy();
  });
});
