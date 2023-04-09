import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateRangeComponent } from './date-range.component';
import { MockModule } from 'ng-mocks';
import { NgbDate, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('DateRangeComponent', () => {
  let component: DateRangeComponent;
  let fixture: ComponentFixture<DateRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DateRangeComponent],
      imports: [MockModule(NgbDatepickerModule)],
    }).compileComponents();
  });

  beforeEach(() => {
    createComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('from and to dates', () => {
    const ngbDate = getNgDate(new Date(2023, 3, 1));

    it('should only set the From Date if both input fields are empty', () => {
      getNgbDatePicker().triggerEventHandler('dateSelect', ngbDate);

      expect(component.fromDate).toEqual(ngbDate);
      expect(component.toDate).toEqual(null);
    });

    it('should only set the From Date if both input fields are filled in', () => {
      component.toDate = getNgDate(new Date(2023, 2, 1));
      component.fromDate = getNgDate(new Date(2023, 1, 1));

      createComponent();

      getNgbDatePicker().triggerEventHandler('dateSelect', ngbDate);

      expect(component.fromDate).toEqual(ngbDate);
      expect(component.toDate).toEqual(null);
    });

    it('should set the To date if its field is empty, From date is already filled in and the selected date is after the From date', () => {
      const setFromDate = getNgDate(new Date(2023, 2, 1));
      component.fromDate = setFromDate;

      getNgbDatePicker().triggerEventHandler('dateSelect', ngbDate);

      expect(component.fromDate).toEqual(setFromDate);
      expect(component.toDate).toEqual(ngbDate);
    });
  });

  function getNgbDatePicker(): DebugElement {
    return fixture.debugElement.query(By.css('[data-test="datepicker"]'));
  }

  function createComponent(): void {
    fixture = TestBed.createComponent(DateRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  function getNgDate(date: Date): NgbDate | null {
    return NgbDate.from({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    });
  }
});
