import { EntityState, createEntityAdapter } from '@ngrx/entity';
import * as actions from '../actions/defect-unassigned.action';

export interface DefectUnassignedEntity {
  id: string;
  title: string;
  date: Date;
  description: string;
}

export interface State extends EntityState<DefectUnassignedEntity> {

}
export const adapter = createEntityAdapter<DefectUnassignedEntity>();

const initialState: State = {
  ids: ['0', '1'],
  entities: {
    0: {
      id: '0',
      title: 'Submit Button works with missing input',
      date: new Date('2018-12-17T03:24:00'),
      description: 'Submit button works when model is empty',
    },
    1: {
      id: '1',
      title: 'Last Name not displaying',
      date: new Date('2018-12-17T03:24:00'),
      description: 'No last name is displayed on summary page',
    }
  }
};

export function reducer(state: State = initialState, action: actions.DefectUnassignedActions): State {
  switch (action.type) {
    case actions.ADD_DEFECT_UNASSIGNED: {
      return adapter.addOne(action.payload, state);
    }
    case actions.REMOVE_DEFECT_UNASSIGNED: {
      return adapter.removeOne(action.defect.id, state);
    }
    default: {
      return state;
    }
  }
}
