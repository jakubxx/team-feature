import { TeamsListComponent } from './teams-list.component';
import { SharedTeamFeatureModule } from '../../shared-team-feature.module';
import { MockBuilder, MockRender } from 'ng-mocks';

describe('TeamsListComponent', () => {
  beforeEach(() => {
    return MockBuilder(TeamsListComponent, SharedTeamFeatureModule);
  });

  it('should create component', () => {
    const fixture = MockRender(TeamsListComponent);
    const component = fixture.point.componentInstance;
    expect(component).toBeTruthy();
  });
});
