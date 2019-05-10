import { Action } from '@ngrx/store';
import { DefectAssignedEntity } from '../reducers/defects-assigned.reducer';

let currentId = 1;

export const ADD_DEFECT_ASSIGNED = '[defectsAssign] add new assigned defect';
export class AddDefectAssigned implements Action {
  readonly type = ADD_DEFECT_ASSIGNED;
  public payload: DefectAssignedEntity;
  constructor(title: string, date: Date, description: string, developer: string) {
    this.payload = {
      id: '' + (++currentId),
      title,
      date,
      description,
      developer
    };
  }
}

export const REMOVE_DEFECT_ASSIGNED = '[defectsAssign] remove an assigned defect';
export class RemoveDefectAssigned implements Action {
  readonly type = REMOVE_DEFECT_ASSIGNED;
  constructor(public defect: DefectAssignedEntity) { }
}

export type DefectAssignedActions = AddDefectAssigned
  | RemoveDefectAssigned;




