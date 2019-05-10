export interface DefectsUnassignedListItem {
  id: string;
  title: string;
  date: Date;
  description: string;
}

export interface DefectsAssignedListItem {
  id: string;
  title: string;
  date: Date;
  description: string;
  developer: string;
}

export interface DefectsCompleteListItem {
  id: string;
  title: string;
  date: Date;
  description: string;
  developer: string;
  commit: string;
}
