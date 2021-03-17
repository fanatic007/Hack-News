import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChallengesService } from '../../services/challenges.service';

@Component({
  selector: 'app-add-challenge',
  templateUrl: './add-challenge.component.html',
  styleUrls: ['./add-challenge.component.scss']
})
export class AddChallengeComponent implements OnInit {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private challengesService: ChallengesService) {
    this.formGroup = formBuilder.group({
      title: formBuilder.control('',[Validators.required]),
      description: formBuilder.control('',[Validators.required]),
      tags: formBuilder.control([],[Validators.minLength(1)])
    });
  }

  ngOnInit(): void {
  }

  addChallenge(){
    if(confirm(`Add ${this.formGroup.get('title').value} Challenge?`)){
      this.formGroup.disable();
      this.challengesService.addChallenge({upvotes:0, ...this.formGroup.value }).subscribe(res=>{
        res.status==='success' && this.resetForm();
        alert("Challenge Added");
      },
      err=>{ console.log(err);
      });
    }
  }

  resetForm(){
    this.formGroup.get('title').setValue('');
    this.formGroup.get('description').setValue('');
    this.formGroup.get('tags').setValue([]);
  }
}