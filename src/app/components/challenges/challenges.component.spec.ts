import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChallengesComponent } from './challenges.component';
import { ChallengesService } from 'src/app/services/challenges.service';
import { DUMMY_CHALLENGE } from '../../models/challenge';
import { from } from 'rxjs';

describe('ChallengesComponent', () => {
  let component: ChallengesComponent;
  let fixture: ComponentFixture<ChallengesComponent>;
  let challengesServiceSpy: jasmine.SpyObj<ChallengesService>;

  beforeEach(async(() => {
    spyOn(window, 'confirm').and.returnValue(true);
    challengesServiceSpy = jasmine.createSpyObj('ChallengesService', ['upvoteChallenge','getAllChallenges']);
    challengesServiceSpy.getAllChallenges.and.returnValue(from([[{...DUMMY_CHALLENGE}]]));
    TestBed.configureTestingModule({
      declarations: [ ChallengesComponent ],
      providers: [
        {provide:ChallengesService, useValue:challengesServiceSpy}
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(ChallengesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create component and have relevant properties', () => {
    expect(component).toBeTruthy();
    expect(component['sortBy']).toBeTruthy();
    expect(component['ascending']).toBeTruthy();
    expect(component['challenges']).toBeTruthy();
    expect(typeof component['getAllChallenges']).toEqual("function");
    expect(typeof component['upvoteChallenge']).toEqual("function");
    expect(typeof component['sortChallenges']).toEqual("function");
  });

  it('should fetch challenges from service', () => {
    expect(component['challenges'].length).toEqual(1);
  });

  it('should show Challenge', () => {
    expect(fixture.nativeElement.querySelectorAll('h2').length).toBe(1);
    expect(fixture.nativeElement.querySelectorAll('h4').length).toBe(1);
    expect(fixture.nativeElement.querySelectorAll('span').length ).toBe(4);
    expect(fixture.nativeElement.querySelectorAll('input[type="checkbox"]').length ).toBe(2);
    expect(fixture.nativeElement.querySelectorAll('select').length ).toBe(1);
  });

  it('should refetch data after clicking upvote', () => {
    challengesServiceSpy.upvoteChallenge.and.returnValue(from([{status:"success"}]));
    component['challenges'][0].title = 'test';
    component['upvoteChallenge'](DUMMY_CHALLENGE._id,true);
    fixture.detectChanges();
    expect(challengesServiceSpy.getAllChallenges).toHaveBeenCalled();
  });

  it('should sort the challenges', () => {
    const DUMMY_CHALLENGE2 = {...DUMMY_CHALLENGE};
    DUMMY_CHALLENGE2.creationDate = new Date("June 25 1994 00:00");
    component['challenges'] = [DUMMY_CHALLENGE, DUMMY_CHALLENGE2 ];
    component['sortBy'] = 'upvotes';
    component['sortChallenges']();
    expect(component['challenges'][0].upvoters.length).toEqual(1);
    component['ascending'] = false;
    component['sortBy'] = 'creationDate';
    component['sortChallenges']();
    expect(component['challenges'][0].creationDate).toEqual(new Date("June 25 1994 00:00"));
  });
});
