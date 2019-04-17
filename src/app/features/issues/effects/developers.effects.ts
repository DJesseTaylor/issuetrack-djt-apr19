import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import * as developerActions from '../actions/developer.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { DeveloperEntity } from '../reducers/developer.reducer';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class DeveloperEffects {
  readonly uri = environment.uri;

  @Effect() loadDevelopers$ = this.actions$
    .pipe(
      ofType(developerActions.LOAD_DEVELOPERS),
      switchMap(() => this.http.get<{ data: DeveloperEntity[] }>(this.uri)
        .pipe(
          map(r => r.data),
          map(d => new developerActions.LoadedDevelopersSuccessfully(d))
        ))
    );

  @Effect() addDeveloper$ = this.actions$
    .pipe(
      ofType(developerActions.ADDED_DEVELOPER),
      map(a => a as developerActions.AddedDeveloper),
      switchMap(originalAction => this.http.post<DeveloperEntity>(this.uri, originalAction.payload)
        .pipe(
          map(developerFromServer => new developerActions.SuccessfullyAddedADeveloper(originalAction.payload.id, developerFromServer)),
          catchError(r =>
            of(new developerActions.FailedAddingDeveloper('Cannot add that developer', originalAction.payload))
          )
        )
      )
    );

  constructor(private actions$: Actions, private http: HttpClient) {

  }
}
