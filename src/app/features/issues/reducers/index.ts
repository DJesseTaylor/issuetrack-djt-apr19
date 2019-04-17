import * as fromDevelopers from './developer.reducer';
import * as fromSorters from './sorters.reducer';
import * as fromUiHints from './ui-hints.reducer';

import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { DeveloperListItem } from '../models';


export const featureName = 'issuesFeatures';

export interface State {
  developers: fromDevelopers.State;
  sorters: fromSorters.State;
  uiHints: fromUiHints.State;
}

export const reducers: ActionReducerMap<State> = {
  developers: fromDevelopers.reducer,
  sorters: fromSorters.reducer,
  uiHints: fromUiHints.reducer
};

// 1 Feature Reducer
export const _selectIssuesFeature = createFeatureSelector<State>(featureName);

// 2 A Reducer per/branch (branch of the state tree)
export const _selectDevelopersBranch = createSelector(_selectIssuesFeature, b => b.developers);
export const _selectSortersBranch = createSelector(_selectIssuesFeature, b => b.sorters);
export const _selectUiHintBranch = createSelector(_selectIssuesFeature, b => b.uiHints);

// 3 Any Helpers you might need
export const { selectAll: _selectDeveloperEntities } = fromDevelopers.adapter.getSelectors(_selectDevelopersBranch);
export const _selectDeveloperListItemsUnsorted = createSelector(_selectDeveloperEntities, devs => devs as DeveloperListItem[]);

// 4 The reducers you select from in you compents/etc
// TODO: DeveloperListItem[]
export const selectSortDeveloperListBy = createSelector(_selectSortersBranch, b => b.sortDevelopersBy);
export const selectDevelopersLoaded = createSelector(_selectUiHintBranch, u => u.developersLoaded);

export const selectDeveloperListItems = createSelector(_selectDeveloperListItemsUnsorted, selectSortDeveloperListBy,
  (list, sortKey) => {
    return [...list.sort((lhs: DeveloperListItem, rhs: DeveloperListItem) => {
      if (lhs[sortKey] < rhs[sortKey]) {
        return -1;
      }
      if (lhs[sortKey] > rhs[sortKey]) {
        return 1;
      }
      return 0;
    })];
  });
