import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag } from '@angular/cdk/drag-drop';
import { DeveloperListItem, DefectsUnassignedListItem, DefectsAssignedListItem, DefectsCompleteListItem } from '../../models';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import { AddDefectUnassigned, RemoveDefectUnassigned } from '../../actions/defect-unassigned.action';
import { RemoveDefectAssigned, AddDefectAssigned } from '../../actions/defect-assigned.action';
import { AddDefectComplete, RemoveDefectComplete } from '../../actions/defect-complete.action';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-defect-tracker',
  templateUrl: './defect-tracker.component.html',
  styleUrls: ['./defect-tracker.component.css']
})
export class DefectTrackerComponent implements OnInit {
  @Input() developers: DeveloperListItem[];
  @Input() defectsUn: DefectsUnassignedListItem[];
  @Input() defectsAs: DefectsAssignedListItem[];
  @Input() defectsComp: DefectsCompleteListItem[];
  inputs: FormGroup;

  constructor(private formBuilder: FormBuilder, private store: Store<State>) { }

  ngOnInit() {
    this.inputs = this.formBuilder.group({
      developer: [''],
      commit: ['']
    });
  }

  dropUnassigned(event: CdkDragDrop<string[]>) {
    if (!(event.previousContainer === event.container)) {
      const temp: any = event.previousContainer.data[event.previousIndex];
      const assignedItem: DefectsAssignedListItem = temp;
      this.store.dispatch(new AddDefectUnassigned(assignedItem.title, assignedItem.date, assignedItem.description));
      this.store.dispatch(new RemoveDefectAssigned(assignedItem));
    }
  }

  dropAssigned(event: CdkDragDrop<string[]>) {
    if (!(event.previousContainer === event.container)) {
      const temp: any = event.previousContainer.data[event.previousIndex];
      const item: DefectsCompleteListItem = temp;
      if (item.commit != null) {
        this.store.dispatch(new AddDefectAssigned(
          item.title,
          item.date,
          item.description,
          item.developer));
        this.store.dispatch(new RemoveDefectComplete(item));
      } else {
        this.store.dispatch(new AddDefectAssigned(
          item.title,
          item.date,
          item.description,
          this.inputs.value.developer));
        const unassignedItem: DefectsUnassignedListItem = temp;
        this.store.dispatch(new RemoveDefectUnassigned(unassignedItem));
      }
    }
  }

  dropComplete(event: CdkDragDrop<string[]>) {
    if (!(event.previousContainer === event.container)) {
      const temp: any = event.previousContainer.data[event.previousIndex];
      const assignedItem: DefectsAssignedListItem = temp;
      this.store.dispatch(new AddDefectComplete(
        assignedItem.title,
        assignedItem.date,
        assignedItem.description,
        assignedItem.developer,
        this.inputs.value.commit));
      this.store.dispatch(new RemoveDefectAssigned(assignedItem));
    }
  }

  notInComplete(item: CdkDrag<DefectsCompleteListItem>) {
    if (item.data.commit != null) {
      return false;
    }
    return true;
  }

  notInUnassigned(item: CdkDrag<DefectsCompleteListItem>) {
    if (item.data.developer != null) {
      return true;
    }
    return false;
  }
}
