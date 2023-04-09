import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MockComponents } from 'ng-mocks';
import { NavComponent } from './modules/custom/layout/components/nav/nav.component';
import { MainComponent } from './modules/custom/layout/components/main/main.component';
import { FooterComponent } from './modules/custom/layout/components/footer/footer.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        AppComponent,
        MockComponents(NavComponent, MainComponent, FooterComponent),
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
