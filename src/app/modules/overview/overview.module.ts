import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewRoutingModule } from './overview-routing.module';
import { ListComponent } from './components/list/list.component';
import { CommitComponent } from './components/commit/commit.component';
import { NgbInputDatepicker, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { DateRangeComponent } from './components/date-range/date-range.component';

@NgModule({
  declarations: [ListComponent, CommitComponent, DateRangeComponent],
  imports: [
    CommonModule,
    OverviewRoutingModule,
    NgbPagination,
    NgbInputDatepicker,
  ],
})
export class OverviewModule {}
