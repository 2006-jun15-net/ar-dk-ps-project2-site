import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { OktaAuthService } from '@okta/okta-angular';

describe('AppComponent', () => {

  let oktaAuth = {
    isAuthenticated() {
      return true;
    }
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],

      providers: [
        { provide: OktaAuthService, useFactory: () => oktaAuth }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ClassRegistration-site'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ClassRegistration-site');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('ClassRegistration-site app is running!');
  });
});
