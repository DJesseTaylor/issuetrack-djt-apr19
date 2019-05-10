import { Action } from '@ngrx/store';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import * as actions from '../actions/defect-assigned.action';

export interface DefectAssignedEntity {
  id: string;
  title: string;
  date: Date;
  description: string;
  developer: string;
}

export interface State extends EntityState<DefectAssignedEntity> {

}
export const adapter = createEntityAdapter<DefectAssignedEntity>();

const initialState: State = {
  ids: ['0', '1'],
  entities: {
    0: {
      id: '0',
      title: 'Page Doesn\'t load',
      date: new Date('2019-03-17T03:24:00'),
      description: 'That page doesn\'t load',
      developer: 'Jesse Taylor'
    },
    1: {
      id: '1',
      title: 'Last Name not displaying',
      date: new Date('2018-12-17T03:24:00'),
      description: 'No last name is displayed on summary page',
      developer: 'Kent Bechtel'
    }
  }
};

export function reducer(state: State = initialState, action: actions.DefectAssignedActions): State {
  switch (action.type) {
    case actions.ADD_DEFECT_ASSIGNED: {
      return adapter.addOne(action.payload, state);
    }
    case actions.REMOVE_DEFECT_ASSIGNED: {
      return adapter.removeOne(action.defect.id, state);
    }
    default: {
      return state;
    }
  }
}
