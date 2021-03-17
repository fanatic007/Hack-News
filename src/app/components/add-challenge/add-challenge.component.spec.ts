import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { from } from 'rxjs';
import { ChallengesService } from 'src/app/services/challenges.service';

import { AddChallengeComponent } from './add-challenge.component';

describe('AddChallengeComponent', () => {
  let component: AddChallengeComponent;
  let fixture: ComponentFixture<AddChallengeComponent>;
  let challengesServiceSpy: jasmine.SpyObj<ChallengesService>;

  beforeEach(async(() => {
    spyOn(window, 'confirm').and.returnValue(true);
    challengesServiceSpy = jasmine.createSpyObj('ChallengesService', ['addChallenge']);
    TestBed.configureTestingModule({
      declarations: [ AddChallengeComponent ],
      imports:[ReactiveFormsModule,FormsModule],
      providers:[
        {provide: ChallengesService, useValue: challengesServiceSpy},
        {provide: FormBuilder}
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(AddChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  afterEach(()=>{
  });

  it('should be having relevant formGroup and methods', () => {
    expect(component).toBeTruthy();
    expect(component['formGroup'].get('title').value).toEqual('');
    expect(component['formGroup'].get('description').value).toEqual('');
    expect(component['formGroup'].get('tags').value).toEqual([]);
    expect(typeof component['addChallenge']).toEqual("function");
  });

  it('should have form to create challenge', () => {
    expect(fixture.nativeElement.querySelectorAll('form').length).toBe(1);
    expect(fixture.nativeElement.querySelectorAll('input').length).toBe(2);
    expect(fixture.nativeElement.querySelectorAll('textarea').length ).toBe(1);
    expect(fixture.nativeElement.querySelectorAll('button').length ).toBe(1);
  });

  it('should reset values after succussfully adding challenge', () => {
    component['formGroup'].get('title').setValue('');
    component['formGroup'].get('description').setValue('');
    component['formGroup'].get('tags').setValue([]);
    expect(fixture.nativeElement.querySelector('button').disabled).toBeTruthy();
  });
  
  it('should reset values after succussfully adding challenge', () => {
    challengesServiceSpy.addChallenge.and.returnValue(from([{status:"success"}]));
    component['formGroup'].get('title').setValue('abc');
    component['formGroup'].get('description').setValue('abc');
    component['formGroup'].get('tags').setValue(['tech']);
    component['addChallenge']();
    expect(component['formGroup'].get('title').value).toEqual('');
    expect(component['formGroup'].get('description').value).toEqual('');
    expect(component['formGroup'].get('tags').value).toEqual([]);
  });

  it('should not reset values after failure in adding challenge', () => {
    challengesServiceSpy.addChallenge.and.returnValue(from([{status:"failure"}]));
    component['formGroup'].get('title').setValue('abc');
    component['formGroup'].get('description').setValue('abc');
    component['formGroup'].get('tags').setValue(['true']);
    component['addChallenge']();
    expect(component['formGroup'].get('title').value.length).toBeGreaterThanOrEqual(1);
    expect(component['formGroup'].get('description').value.length).toBeGreaterThanOrEqual(1);
    expect(component['formGroup'].get('title').value.length).toBeGreaterThanOrEqual(1);
  });
});