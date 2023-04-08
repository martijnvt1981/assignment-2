import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Commit} from "../types/data.type";
import {COMMIT} from "../../../../test-helpers/commit.constants";

describe('DataService', () => {
  let service: DataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an array of commits', (done: DoneFn) => {
    const since = new Date(2023,2,1);
    const until = new Date(2023,2,2);
    const page = 1;
    const perPage = 10;
    const response = [COMMIT];

    service
      .getCommits(since, until, page, perPage)
      .subscribe((response: Commit) => {
        expect(response).toEqual(COMMIT);
        done();
      });

    const req = httpTestingController.expectOne(
      `https://api.github.com/repos/angular/angular/commits?since=${since.toISOString()}&until=${until.toISOString()}&page=${page}&per_page=${perPage}`
    );

    expect(req.request.method).toBe('GET');

    req.flush(response);
  });

  it('should return a single commit', (done: DoneFn) => {
    const ref = 'sha-112332232';
    const response = { COMMIT };

    service
      .getCommit(ref)
      .subscribe((response: Commit) => {
        expect(response).toEqual(COMMIT);
        done();
      });

    const req = httpTestingController.expectOne(
      `https://api.github.com/repos/angular/angular/commits/${ref}`
    );

    expect(req.request.method).toBe('GET');

    req.flush(response);
  });
});
