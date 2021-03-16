import { ChallengesService } from './challenges.service';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IChallenge } from '../models/challenge';
import { from, Observable } from 'rxjs';

describe('ChallengesService', () => {
  let challengeService: ChallengesService;
  let httpMock: HttpTestingController;
  const ENDPOINT = "localhost:3000/challenges/";

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ChallengesService]
    });
    challengeService = TestBed.inject(ChallengesService);
    httpMock =  TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should call the API Endpoint name and corresponding methods', () => {
    expect(challengeService['endpoint']).toBeTruthy();
    expect(challengeService['getAllChallenges']).toBeTruthy();
    expect(challengeService['addChallenge']).toBeTruthy();
    expect(challengeService['upvoteChallenge']).toBeTruthy();
  });

});