import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OverviewRoutingModule} from "./overview-routing.module";
import { ListComponent } from './components/list/list.component';



@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    OverviewRoutingModule
  ]
})
export class OverviewModule { }
