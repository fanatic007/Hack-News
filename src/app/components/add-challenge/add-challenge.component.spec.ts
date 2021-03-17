import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChallengesService } from 'src/app/services/challenges.service';

import { AddChallengeComponent } from './add-challenge.component';

describe('AddChallengeComponent', () => {
  let component: AddChallengeComponent;
  let fixture: ComponentFixture<AddChallengeComponent>;
  let challengesServiceSpy;

  beforeEach(async(() => {
    challengesServiceSpy = jasmine.createSpyObj('ChallengesService', ['addChallenge']);
    challengesServiceSpy.addChallenge.returnValue({status:"success"});
    TestBed.configureTestingModule({
      declarations: [ AddChallengeComponent ],
      providers:[
        {provide: ChallengesService, useClass: challengesServiceSpy}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be having relevant formGroup and methods', () => {
    expect(component).toBeTruthy();
    expect(component['formGroup'].get('title').value).toEqual('');
    expect(component['formGroup'].get('description').value).toEqual('');
    expect(component['formGroup'].get('upvotes').value).toEqual(0);
    expect(component['formGroup'].get('tags').value).toEqual([]);
    expect(typeof component['addChallenge']).toBeTruthy(Function);
  });

  it('should have form to create challenge', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('form').length).toBe(1);
    expect(fixture.nativeElement.querySelector('input') ).toBe(2);
    expect(fixture.nativeElement.querySelector('textarea') ).toBe(2);
    expect(fixture.nativeElement.querySelector('button') ).toBe(1);
  });

  it('should reset values after succussfully adding challenge', () => {
    component['formGroup'].get('title').setValue('abc');
    component['formGroup'].get('description').setValue('abc');
    component['formGroup'].get('tags').setValue([]);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('button')[0].disabled).toBeTruthy();
  });
  
  it('should reset values after succussfully adding challenge', () => {
    component['formGroup'].get('title').setValue('abc');
    component['formGroup'].get('description').setValue('abc');
    component['formGroup'].get('tags').setValue(['tech']);
    fixture.detectChanges();
    component['addChallenge']();
    fixture.detectChanges();
    expect(component['formGroup'].get('title').value).toEqual('');
    expect(component['formGroup'].get('description').value).toEqual('');
    expect(component['formGroup'].get('tags').value).toEqual([]);
  });

  it('should not reset values after failure in adding challenge', () => {
    challengesServiceSpy = jasmine.createSpyObj('ChallengesService', ['addChallenge']);
    challengesServiceSpy.addChallenge.returnValue({status:"failure"});
    TestBed.configureTestingModule({
      declarations: [ AddChallengeComponent ],
      providers:[
        {provide: ChallengesService, useClass: challengesServiceSpy}
      ]
    }).compileComponents();
    component['formGroup'].get('title').setValue('abc');
    component['formGroup'].get('description').setValue('abc');
    component['formGroup'].get('tags').setValue(['true']);
    fixture.detectChanges();
    component['addChallenge']();
    fixture.detectChanges();
    expect(component['title'].value.length).toBeGreaterThanOrEqual(1);
    expect(component['description'].value.length).toBeGreaterThanOrEqual(1);
    expect(component['tags'].value.length).toBeGreaterThanOrEqual(1);
  });
});