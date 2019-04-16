import * as fromDevelopers from './developer.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { DeveloperListItem } from '../models';

export const featureName = 'issuesFeatures';

export interface State {
  developers: fromDevelopers.State;
}

export const reducers: ActionReducerMap<State> = {
  developers: fromDevelopers.reducer
};

// 1 Feature Reducer
export const _selectIssuesFeature = createFeatureSelector<State>(featureName);

// 2 A Reducer per/branch (branch of the state tree)
export const _selectDevelopersBranch = createSelector(_selectIssuesFeature, b => b.developers);

// 3 Any Helpers you might need
export const { selectAll: _selectDeveloperEntities } = fromDevelopers.adapter.getSelectors(_selectDevelopersBranch);

// 4 The reducers you select from in you compents/etc
// TODO: DeveloperListItem[]
export const selectDeveloperListItems = createSelector(_selectDeveloperEntities, devs => devs as DeveloperListItem[]);
