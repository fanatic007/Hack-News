import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AddChallengeComponent } from './components/add-challenge/add-challenge.component';

describe('AppComponent', () => {
  let addChallengeComponent: jasmine.SpyObj<AddChallengeComponent>;
  beforeEach(async(() => {
    addChallengeComponent = jasmine.createSpyObj('AddChallengeComponent',['addChallenge']);
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        AddChallengeComponent
      ],
    }).compileComponents();
  }));

  // it('should create the app', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app).toBeTruthy();
  // });

  // it(`should have as title 'HackNews'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('HackNews');
  // });
});
