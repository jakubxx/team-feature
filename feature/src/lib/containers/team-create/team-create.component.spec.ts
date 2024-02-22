import { TeamCreateComponent } from './team-create.component';
import { SharedTeamFeatureModule } from '../../shared-team-feature.module';
import { MockBuilder, MockRender } from 'ng-mocks';
import { RouterModule } from '@angular/router';

describe('TeamCreateComponent', () => {
  beforeEach(() => {
    return MockBuilder(TeamCreateComponent, [
      SharedTeamFeatureModule,
      RouterModule.forRoot([]),
    ]);
  });

  it('should create component', () => {
    const fixture = MockRender(TeamCreateComponent);
    const component = fixture.point.componentInstance;
    expect(component).toBeTruthy();
  });
});
