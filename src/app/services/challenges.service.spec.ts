import { ChallengesService } from './challenges.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DUMMY_CHALLENGE } from '../models/challenge';

describe('ChallengesService', () => {
  let challengeService: ChallengesService;
  let httpMock: HttpTestingController;
  const ENDPOINT = "http://localhost:3000/challenges/";

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

  it('GET request should respond with an Observable of array of IChallenge', () => {
    challengeService.getAllChallenges().subscribe(challenges => {
      expect(('title' in challenges[0]) && ('description' in challenges[0]) && ('tags' in challenges[0]) && ('tags' in challenges[0]) && ('_id' in challenges[0]) ).toBeTruthy(1);
    });
    const req = httpMock.expectOne(ENDPOINT);
    req.flush([DUMMY_CHALLENGE]);
    expect(req.request.method).toEqual('GET');
  });

  it('POST request should create a challenge', () => {
    challengeService.addChallenge(DUMMY_CHALLENGE).subscribe(response => {
      expect(response.status).toBeTruthy(1);
      expect(response.status).toEqual('success');
    });
    const req = httpMock.expectOne(ENDPOINT);
    req.flush({ status: "success" });
    expect(req.request.method).toEqual('POST');
  });

  it('PUT request should update a challenge', () => {
    challengeService.upvoteChallenge("id",true).subscribe(response => {
      expect(response.status).toBeTruthy(1);
      expect(response.status).toEqual('success');
    });
    const req = httpMock.expectOne(ENDPOINT);
    req.flush({ status: "success" });
    expect(req.request.method).toEqual('PUT');
  });
});