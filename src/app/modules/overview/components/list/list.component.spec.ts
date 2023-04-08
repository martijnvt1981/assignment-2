import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import {MockComponent, MockProvider} from "ng-mocks";
import {DataService} from "../../../../data/service/data.service";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {of} from "rxjs";
import {COMMIT} from "../../../../../../test-helpers/commit.constants";

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      providers: [MockProvider(DataService, {
        getCommits: () => of([COMMIT])
      })],
      imports: [MockComponent(NgbPagination)]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
