import { EntityState, createEntityAdapter } from '@ngrx/entity';
import * as actions from '../actions/defect-complete.action';

export interface DefectCompleteEntity {
  id: string;
  title: string;
  date: Date;
  description: string;
  developer: string;
  commit: string;
}

export interface State extends EntityState<DefectCompleteEntity> {

}
export const adapter = createEntityAdapter<DefectCompleteEntity>();

const initialState: State = {
  ids: ['0', '1'],
  entities: {
    0: {
      id: '0',
      title: 'Submit Button works with missing input',
      date: new Date('2018-12-17T03:24:00'),
      description: 'Submit button works when model is empty',
      developer: 'Jesse Taylor',
      commit: 'Made the Submit Required'
    },
    1: {
      id: '1',
      title: 'Make and Model not displaying',
      date: new Date('2018-12-17T03:24:00'),
      description: 'No last name is displayed on summary page',
      developer: 'Kent Bechtel',
      commit: 'Fixed spelling for Make and Model field'
    }
  }
};

export function reducer(state: State = initialState, action: actions.DefectCompleteActions): State {
  switch (action.type) {
    case actions.ADD_DEFECT_COMPLETE: {
      return adapter.addOne(action.payload, state);
    }
    case actions.REMOVE_DEFECT_COMPLETE: {
      return adapter.removeOne(action.defect.id, state);
    }
    default: {
      return state;
    }
  }
}
