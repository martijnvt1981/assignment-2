import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListComponent} from "./components/list/list.component";
import {CommitComponent} from "./components/commit/commit.component";


const routes: Routes = [
  {
    path: '',
    component: ListComponent
  },
  {
    path: 'commit/:id',
    component: CommitComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OverviewRoutingModule { }
