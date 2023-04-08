import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OverviewRoutingModule} from "./overview-routing.module";
import { ListComponent } from './components/list/list.component';
import { CommitComponent } from './components/commit/commit.component';
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";



@NgModule({
  declarations: [
    ListComponent,
    CommitComponent
  ],
  imports: [
    CommonModule,
    OverviewRoutingModule,
    NgbPagination
  ]
})
export class OverviewModule { }
