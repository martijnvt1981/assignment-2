import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { COMMIT } from '../../../../test-helpers/commit.constants';

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
    const fromDate = new Date(2023, 2, 1);
    const toDate = new Date(2023, 2, 2);
    const page = 1;
    const perPage = 10;
    const data = [COMMIT];

    service
      .getCommits(fromDate, toDate, page, perPage)
      .subscribe((response) => {
        expect(response.body).toEqual(data);
        done();
      });

    const req = httpTestingController.expectOne(
      `https://api.github.com/repos/angular/angular/commits?since=${fromDate.toISOString()}&until=${toDate.toISOString()}&page=${page}&per_page=${perPage}`
    );

    expect(req.request.method).toBe('GET');

    req.flush(data);
  });

  it('should return a single commit', (done: DoneFn) => {
    const ref = 'sha-112332232';
    const data = COMMIT;

    service.getCommit(ref).subscribe((response) => {
      expect(response).toEqual(data);
      done();
    });

    const req = httpTestingController.expectOne(
      `https://api.github.com/repos/angular/angular/commits/${ref}`
    );

    expect(req.request.method).toBe('GET');

    req.flush(data);
  });
});
