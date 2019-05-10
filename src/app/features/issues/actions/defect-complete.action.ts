import { Action } from '@ngrx/store';
import { DefectCompleteEntity } from '../reducers/defects-complete.reducer';

let currentId = 1;

export const ADD_DEFECT_COMPLETE = '[defectsComplete] add new complete defect';
export class AddDefectComplete implements Action {
  readonly type = ADD_DEFECT_COMPLETE;
  public payload: DefectCompleteEntity;
  constructor(title: string, date: Date, description: string, developer: string, commit: string) {
    this.payload = {
      id: '' + (++currentId),
      title,
      date,
      description,
      developer,
      commit
    };
  }
}

export const REMOVE_DEFECT_COMPLETE = '[defectsComplete] remove an complete defect';
export class RemoveDefectComplete implements Action {
  readonly type = REMOVE_DEFECT_COMPLETE;
  constructor(public defect: DefectCompleteEntity) { }
}

export type DefectCompleteActions = AddDefectComplete
  | RemoveDefectComplete;




