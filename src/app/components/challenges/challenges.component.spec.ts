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
    expect(component['challenges']).toBeTruthy();
    expect(typeof component['challenges']).toEqual("IChallenge[]");
    expect(typeof component['getAllChallenges']).toEqual("function");
    expect(typeof component['upvoteChallenge']).toEqual("function");
    expect(typeof component['sortChallenges']).toEqual("function");
  });

  it('should fetch challenges from service', () => {
    challengesServiceSpy.getAllChallenges.and.returnValue(from([[DUMMY_CHALLENGE]]));
    expect(component['challenges'].length).toEqual(1);
  });

  it('should show Challenge', () => {
    challengesServiceSpy.getAllChallenges.and.returnValue(from([[DUMMY_CHALLENGE]]));
    expect(fixture.nativeElement.querySelectorAll('h2').length).toBe(1);
    expect(fixture.nativeElement.querySelectorAll('h4').length).toBe(1);
    expect(fixture.nativeElement.querySelectorAll('span').length ).toBe(2);
    expect(fixture.nativeElement.querySelectorAll('button').length ).toBe(1);
  });

  it('should increase the upvotes of the challenge after clicking upvote', () => {
    challengesServiceSpy.getAllChallenges.and.returnValue(from([[DUMMY_CHALLENGE]]));
    challengesServiceSpy.upvoteChallenge.and.returnValue(from([{status:"success"}]));
    expect(component['challenges'][0].upvotes).toEqual(3);
  });

  it('should sort the challenges', () => {
    const DUMMY_CHALLENGE2 = {...DUMMY_CHALLENGE};
    DUMMY_CHALLENGE.upvotes = 1;
    DUMMY_CHALLENGE.creationDate.setFullYear(2024);
    component['challenges'] = [DUMMY_CHALLENGE, DUMMY_CHALLENGE2 ];
    component['sortBy'] = 'upvotes';
    component['sortChallenges']();
    component['sortBy'] = 'creationDate';
    component['sortChallenges']();
    expect(component['challenges'][0].upvotes).toEqual(new Date());
  });
});
