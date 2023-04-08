import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitComponent } from './commit.component';
import {MockProvider} from "ng-mocks";
import {DataService} from "../../../../data/service/data.service";
import {RouterTestingModule} from "@angular/router/testing";

describe('CommitComponent', () => {
  let component: CommitComponent;
  let fixture: ComponentFixture<CommitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommitComponent ],
      imports: [RouterTestingModule],
      providers: [MockProvider(DataService)]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
