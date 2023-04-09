import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { MockComponents, MockInstance, MockProvider } from 'ng-mocks';
import { DataService } from '../../../../data/service/data.service';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { COMMIT } from '../../../../../../test-helpers/commit.constants';
import { HttpResponse } from '@angular/common/http';
import { Commit } from '../../../../data/types/data.model';
import { subMonths } from 'date-fns';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DateRangeComponent } from '../date-range/date-range.component';

const TO_DATE = new Date(2023, 0, 1);
const FROM_DATE = subMonths(TO_DATE, 1);

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let spyGetCommits: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent, MockComponents(DateRangeComponent)],
      providers: [MockProvider(DataService)],
      imports: [MockComponents(NgbPagination)],
    }).compileComponents();
  });

  beforeEach(() => {
    jasmine.clock().install();
    jasmine.clock().mockDate(TO_DATE);
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  MockInstance.scope();

  beforeEach(() => {
    spyGetCommits = MockInstance(
      DataService,
      'getCommits',
      jasmine
        .createSpy()
        .and.returnValue(of(new HttpResponse<Commit[]>({ body: [COMMIT] })))
    );
  });

  beforeEach(() => {
    createComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call upon the getCommits endpoint when initializing the component, using the current date', () => {
    expect(spyGetCommits).toHaveBeenCalledWith(FROM_DATE, TO_DATE, 1, 15);
  });

  it('should call upon the getCommits endpoint when changing pages, using the value of that page', () => {
    const newPage = 2;

    getNgbPagination().triggerEventHandler('pageChange', newPage);

    expect(component.page).toEqual(newPage);
    expect(spyGetCommits).toHaveBeenCalledWith(FROM_DATE, TO_DATE, newPage, 15);
  });

  it('should call upon the getCommits endpoint when changing the range of dates', () => {
    const newFromDate = new Date(2023, 2, 1);
    const newToDate = new Date(2023, 3, 1);

    getDateRange().triggerEventHandler('rangeChange', {
      from: newFromDate,
      to: newToDate,
    });

    expect(component.fromDate).toEqual(newFromDate);
    expect(component.toDate).toEqual(newToDate);
    expect(spyGetCommits).toHaveBeenCalledWith(newFromDate, newToDate, 1, 15);
  });

  function createComponent(): void {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  function getNgbPagination(): DebugElement {
    return fixture.debugElement.query(By.css('[data-test="pagination"]'));
  }

  function getDateRange(): DebugElement {
    return fixture.debugElement.query(By.css("[data-test='date-range']"));
  }
});
