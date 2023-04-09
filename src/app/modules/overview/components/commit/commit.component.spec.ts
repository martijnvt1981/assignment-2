import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommitComponent } from './commit.component';
import { MockInstance, MockProvider } from 'ng-mocks';
import { DataService } from '../../../../data/service/data.service';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

const ID = '123';

describe('CommitComponent', () => {
  let component: CommitComponent;
  let fixture: ComponentFixture<CommitComponent>;
  let spyGetCommit: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommitComponent],
      imports: [RouterTestingModule],
      providers: [
        MockProvider(DataService),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { id: ID } } },
        },
      ],
    }).compileComponents();
  });

  MockInstance.scope();

  beforeEach(() => {
    spyGetCommit = MockInstance(DataService, 'getCommit', jasmine.createSpy());
  });

  beforeEach(() => {
    createComponent();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call upon the commit endpoint using the route ID parameter', () => {
    expect(spyGetCommit).toHaveBeenCalledWith(ID);
  });

  function createComponent() {
    fixture = TestBed.createComponent(CommitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }
});
