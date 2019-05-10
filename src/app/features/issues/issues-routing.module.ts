import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IssuesComponent } from './issues.component';
import { OverviewComponent } from './containers/overview/overview.component';
import { DevelopersComponent } from './containers/developers/developers.component';
import { DefectsComponent } from './containers/defects/defects.component';

const routes: Routes = [
  {
    path: 'issues',
    component: IssuesComponent,
    children: [
      {
        path: 'overview',
        component: OverviewComponent
      },
      {
        path: 'developers',
        component: DevelopersComponent
      },
      {
        path: 'defects',
        component: DefectsComponent
      },
      {
        path: '**',
        redirectTo: 'overview'
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IssuesRoutingModule { }
