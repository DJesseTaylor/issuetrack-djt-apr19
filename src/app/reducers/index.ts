import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import * as fromErrors from './errors.reducer';
import { environment } from '../../environments/environment';

export interface State {
  errors: fromErrors.State;
}

export const reducers: ActionReducerMap<State> = {
  errors: fromErrors.reducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const _selectErrorsBranch = (state: State) => state.errors;

export const selectHasError = createSelector(_selectErrorsBranch, b => b.hasError);
export const selectErrorMessage = createSelector(_selectErrorsBranch, e => e.pendingError);
