import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { DateRange } from '../../../../shared/date.model';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRangeComponent {
  hoveredDate: NgbDate | null = null;
  @Input() fromDate: NgbDate | null = null;
  @Input() toDate: NgbDate | null = null;
  @Output() rangeChange = new EventEmitter<DateRange>();

  constructor(
    private readonly calendar: NgbCalendar,
    public readonly formatter: NgbDateParserFormatter
  ) {}

  onDateSelection(date: NgbDate) {
    if ((!this.fromDate && !this.toDate) || (this.fromDate && this.toDate)) {
      this.fromDate = date;
      this.toDate = null;
      return;
    }

    if (this.fromDate && !this.toDate && date?.after(this.fromDate)) {
      this.toDate = date;
      this.rangeChange.emit(this.getDates(this.fromDate, this.toDate));
      return;
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed))
      ? NgbDate.from(parsed)
      : currentValue;
  }

  private getDates(from: NgbDateStruct, to: NgbDateStruct): DateRange {
    return {
      from: new Date(from.year, from.month - 1, from.day),
      to: new Date(to.year, to.month - 1, to.day),
    };
  }
}
