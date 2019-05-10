import { Action } from '@ngrx/store';
import { DefectUnassignedEntity } from '../reducers/defects-unassigned.reducer';

let currentId = 1;

export const ADD_DEFECT_UNASSIGNED = '[defectsUnassign] add new assigned defect';
export class AddDefectUnassigned implements Action {
  readonly type = ADD_DEFECT_UNASSIGNED;
  public payload: DefectUnassignedEntity;
  constructor(title: string, date: Date, description: string) {
    this.payload = {
      id: '' + (++currentId),
      title,
      date,
      description
    };
  }
}

export const REMOVE_DEFECT_UNASSIGNED = '[defectsUnassign] remove an assigned defect';
export class RemoveDefectUnassigned implements Action {
  readonly type = REMOVE_DEFECT_UNASSIGNED;
  constructor(public defect: DefectUnassignedEntity) { }
}

export type DefectUnassignedActions = AddDefectUnassigned
  | RemoveDefectUnassigned;




