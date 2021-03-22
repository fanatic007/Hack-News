import { Component, OnInit } from '@angular/core';
import { IChallenge } from '../../models/challenge';
import { ChallengesService } from 'src/app/services/challenges.service';
import { faThumbsUp as faThumbsUpSolid, faArrowDown as faSortUpSolid } from '@fortawesome/free-solid-svg-icons';
import { faThumbsUp as faThumbsUpRegular } from "@fortawesome/free-regular-svg-icons";

@Component({
  selector: 'app-challenges',
  templateUrl: './challenges.component.html',
  styleUrls: ['./challenges.component.scss']
})
export class ChallengesComponent implements OnInit {
  challenges : IChallenge[] = [];
  sortBy : string = 'upvotes';
  employeeId: string = '';
  role: string = 'user';
  ascending: boolean = true;
  currentPage: any = 1;
  currentPageSize: any = 5;
  pageSizes = [5,10,20];
  currentPageView = [];
  faThumbsUpSolid = faThumbsUpSolid;
  faThumbsUpRegular = faThumbsUpRegular;
  faSortUpSolid = faSortUpSolid;

  constructor(private challengesService: ChallengesService) { }

  ngOnInit(): void {
    this.role = window.localStorage.getItem('role');
    this.employeeId = window.localStorage.getItem('employeeId');
    this.getAllChallenges();
  }

  getAllChallenges(){
    this.challengesService.getAllChallenges().subscribe(
      res => {
        this.challenges=[...res];
        this.sortChallenges();
      },
      err => {console.log(err);
        if(err.status==401) return
        alert('Problem fetching challenges');
      }
    );
  }  

  upvoteChallenge(id:string,upvote:boolean){
    this.challengesService.upvoteChallenge(id,upvote).subscribe(
      res => {
        this.getAllChallenges();
      },
      err => {console.log(err);
        alert('Problem fetching challenges');
      }
    );
  }

  sortChallenges(){
    let dateComparator = (a,b)=> !this.ascending? new Date(b.creationDate).getTime() - new Date(a.creationDate).getTime() : new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime();
    let upvotesComparator = (a,b)=> !this.ascending? b.upvoters.length - a.upvoters.length : a.upvoters.length - b.upvoters.length;
    this.challenges = this.challenges.sort(this.sortBy==='upvotes'?upvotesComparator:dateComparator);
    this.updateCurrentPageView();
  }

  pageChanged(page:number){
    this.currentPage = page || 1;
    this.updateCurrentPageView();
  }

  pageSizeChanged(pageSize:number){
    this.currentPageSize = pageSize;
    this.currentPage = 1;
    this.updateCurrentPageView();
  }

  updateCurrentPageView() {
    let start = (this.currentPage-1)*this.currentPageSize;
    this.currentPageView =  this.challenges.slice(start,start + this.currentPageSize);
  }
}
