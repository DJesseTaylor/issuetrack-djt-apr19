import * as fromDevelopers from './developer.reducer';
import * as fromSorters from './sorters.reducer';
import * as fromUiHints from './ui-hints.reducer';
import * as fromDefectsUnassigned from './defects-unassigned.reducer';
import * as fromDefectsAssigned from './defects-assigned.reducer';
import * as fromDefectsComplete from './defects-complete.reducer';

import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { DeveloperListItem, DefectsAssignedListItem, DefectsCompleteListItem } from '../models';
import { DefectsUnassignedListItem } from '../models';


export const featureName = 'issuesFeatures';

export interface State {
  developers: fromDevelopers.State;
  sorters: fromSorters.State;
  uiHints: fromUiHints.State;
  defectsUnassigned: fromDefectsUnassigned.State;
  defectsAssigned: fromDefectsAssigned.State;
  defectsComplete: fromDefectsComplete.State;
}

export const reducers: ActionReducerMap<State> = {
  developers: fromDevelopers.reducer,
  sorters: fromSorters.reducer,
  uiHints: fromUiHints.reducer,
  defectsUnassigned: fromDefectsUnassigned.reducer,
  defectsAssigned: fromDefectsAssigned.reducer,
  defectsComplete: fromDefectsComplete.reducer
};

// 1 Feature Reducer
export const _selectIssuesFeature = createFeatureSelector<State>(featureName);

// 2 A Reducer per/branch (branch of the state tree)
export const _selectDevelopersBranch = createSelector(_selectIssuesFeature, b => b.developers);
export const _selectSortersBranch = createSelector(_selectIssuesFeature, b => b.sorters);
export const _selectUiHintBranch = createSelector(_selectIssuesFeature, b => b.uiHints);
export const _selectDefectUnassignedBranch = createSelector(_selectIssuesFeature, b => b.defectsUnassigned);
export const _selectDefectAssignedBranch = createSelector(_selectIssuesFeature, b => b.defectsAssigned);
export const _selectDefectCompleteBranch = createSelector(_selectIssuesFeature, b => b.defectsComplete);

// 3 Any Helpers you might need
export const { selectAll: _selectDeveloperEntities } = fromDevelopers.adapter.getSelectors(_selectDevelopersBranch);
export const _selectDeveloperListItemsUnsorted = createSelector(_selectDeveloperEntities, devs => devs as DeveloperListItem[]);
export const { selectAll: _selectDefectUnassignedEntities } = fromDefectsUnassigned.adapter.getSelectors(_selectDefectUnassignedBranch);
export const { selectAll: _selectDefectAssignedEntities } = fromDefectsAssigned.adapter.getSelectors(_selectDefectAssignedBranch);
export const { selectAll: _selectDefectCompleteEntities } = fromDefectsComplete.adapter.getSelectors(_selectDefectCompleteBranch);


// 4 The reducers you select from in you compents/etc
// TODO: DeveloperListItem[]
export const selectSortDeveloperListBy = createSelector(_selectSortersBranch, b => b.sortDevelopersBy);
export const selectDevelopersLoaded = createSelector(_selectUiHintBranch, u => u.developersLoaded);
export const selectDefectsUnassignedList = createSelector(_selectDefectUnassignedEntities, defs => defs as DefectsUnassignedListItem[]);
export const selectDefectsAssignedList = createSelector(_selectDefectAssignedEntities, defects => defects as DefectsAssignedListItem[]);
export const selectDefectsCompleteList = createSelector(_selectDefectCompleteEntities, defects => defects as DefectsCompleteListItem[]);

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
