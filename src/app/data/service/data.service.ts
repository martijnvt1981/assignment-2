import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Commit } from '../types/data.model';

const headers = new HttpHeaders().set('X-GitHub-Api-Version', '2022-11-28');

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private readonly httpClient: HttpClient) {}

  getCommits(
    fromDate: Date,
    toDate: Date,
    page: number,
    perPage: number
  ): Observable<HttpResponse<Commit[]>> {
    const params = new HttpParams()
      .set('since', fromDate.toISOString())
      .set('until', toDate.toISOString())
      .set('page', page)
      .set('per_page', perPage);

    return this.httpClient.get<Commit[]>(
      `https://api.github.com/repos/angular/angular/commits`,
      {
        headers,
        params,
        observe: 'response',
      }
    );
  }

  getCommit(ref: string): Observable<Commit> {
    return this.httpClient.get<Commit>(
      `https://api.github.com/repos/angular/angular/commits/${ref}`,
      {
        headers,
      }
    );
  }
}
