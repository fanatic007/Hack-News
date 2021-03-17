import { Component, OnInit } from '@angular/core';
import { IChallenge } from '../../models/challenge';
import { ChallengesService } from 'src/app/services/challenges.service';

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.scss']
})
export class ChallengesComponent implements OnInit {
  challenges : IChallenge[] = [];
  sortBy : string = 'upvotes';

  constructor(private challengesService: ChallengesService) { }

  ngOnInit(): void {
    this.getAllChallenges();
  }

  getAllChallenges(){
    this.challengesService.getAllChallenges().subscribe(
      res => {
        this.challenges=[...res];
        this.sortChallenges();
      },
      err => {console.log(err);      
        alert('Problem fetching challenges');
      }
    );
  }  

  upvoteChallenge(id:string){
    this.challengesService.upvoteChallenge(id).subscribe(
      res => {
        this.getAllChallenges();
      },
      err => {console.log(err);
        alert('Problem fetching challenges');
      }
    );
  }

  sortChallenges(){
    this.challenges.sort((a,b)=> a[this.sortBy]-b[this.sortBy]);
  }
}
