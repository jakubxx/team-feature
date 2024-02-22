import { Action } from '@ngrx/store';
import * as fromCreate from './create/create.reducer';
import * as fromRemoved from './removed/removed.reducer';
import * as fromSelected from './selected/selected.reducer';
import * as fromUpdate from './update/update.reducer';

export const featureKey = 'team';

export interface State {
  [fromCreate.featureKey]?: fromCreate.State;
  [fromRemoved.featureKey]?: fromRemoved.State;
  [fromSelected.featureKey]?: fromSelected.State;
  [fromUpdate.featureKey]?: fromUpdate.State;
}

export const initialState: State = {};

export function reducer(state = initialState, action: Action): State {
  return {
    ...state,
    [fromSelected.featureKey]: fromSelected.redcuer(
      state[fromSelected.featureKey],
      action
    ),
    [fromCreate.featureKey]: fromCreate.reducer(
      state[fromCreate.featureKey],
      action
    ),
    [fromRemoved.featureKey]: fromRemoved.reducer(
      state[fromRemoved.featureKey],
      action
    ),

    [fromUpdate.featureKey]: fromUpdate.reducer(
      state[fromUpdate.featureKey],
      action
    ),
  };
}
