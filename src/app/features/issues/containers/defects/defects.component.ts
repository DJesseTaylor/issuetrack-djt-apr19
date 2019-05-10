import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DeveloperListItem, DefectsUnassignedListItem, DefectsAssignedListItem, DefectsCompleteListItem } from '../../models';
import { Store } from '@ngrx/store';
import {
  State,
  selectDeveloperListItems,
  selectDevelopersLoaded,
  selectDefectsUnassignedList,
  selectDefectsAssignedList,
  selectDefectsCompleteList
} from '../../reducers';


@Component({
  selector: 'app-defects',
  templateUrl: './defects.component.html',
  styleUrls: ['./defects.component.css']
})
export class DefectsComponent implements OnInit {

  devsLoaded$: Observable<boolean>;
  devs$: Observable<DeveloperListItem[]>;
  defectsUnassigned$: Observable<DefectsUnassignedListItem[]>;
  defectsAssigned$: Observable<DefectsAssignedListItem[]>;
  defectsComplete$: Observable<DefectsCompleteListItem[]>;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.devs$ = this.store.select(selectDeveloperListItems);
    this.devsLoaded$ = this.store.select(selectDevelopersLoaded);

    this.defectsUnassigned$ = this.store.select(selectDefectsUnassignedList);
    this.defectsAssigned$ = this.store.select(selectDefectsAssignedList);
    this.defectsComplete$ = this.store.select(selectDefectsCompleteList);
  }

}
