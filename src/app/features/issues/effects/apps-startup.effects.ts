import { Actions, Effect, ofType } from '@ngrx/effects';
import * as appActions from '../../../actions/app.actions';
import * as developerAction from '../actions/developer.actions';
import { concatMap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class AppStartUpEffects {

  @Effect() startup$ = this.actions$
    .pipe(
      ofType(appActions.APP_START),
      concatMap(() => [
        new developerAction.LoadDevelopers()
      ])
    );

  @Effect() addingDeveloperError$ = this.actions$
    .pipe(
      ofType(developerAction.ADDED_DEVELOPER_FAILURE),
      map(a => a as developerAction.FailedAddingDeveloper),
      map(a => new appActions.ApplicationError(a.errorMessage, 'issue'))
    );

  constructor(private actions$: Actions) {

  }
}
