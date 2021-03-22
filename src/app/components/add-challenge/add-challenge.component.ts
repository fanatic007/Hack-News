import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChallengesService } from '../../services/challenges.service';
import { faTimesCircle } from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: 'app-add-challenge',
  templateUrl: './add-challenge.component.html',
  styleUrls: ['./add-challenge.component.scss']
})
export class AddChallengeComponent implements OnInit {
  formGroup: FormGroup;
  @Output() challengeAdded = new EventEmitter();
  faTimesCircle = faTimesCircle;

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
      this.challengesService.addChallenge(this.formGroup.value).subscribe(res=>{
        res.status==='success' && this.resetForm();
        this.challengeAdded.emit();
        this.formGroup.enable();
        alert("Challenge Added");
      },
      err=>{ console.log(err);
        this.formGroup.enable();
      });
    }
  }  

  resetForm(){
    this.formGroup.get('title').setValue('');
    this.formGroup.get('description').setValue('');
    this.formGroup.get('tags').setValue([]);
  }

  addTag(event){
    this.formGroup.get('tags').value.push(event.target.value);
    event.target.value = "";
  }
}