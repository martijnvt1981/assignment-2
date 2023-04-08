import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Commit} from "../types/data.type";

const headers = new HttpHeaders()
  .set('X-GitHub-Api-Version', '2022-11-28')

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private readonly httpClient: HttpClient) { }

  getCommits(since: Date, until: Date, page: number, perPage: number): Observable<any> {
    const params = new HttpParams()
      .set('since', since.toISOString())
      .set('until', until.toISOString())
      .set('page', page)
      .set('per_page', perPage);

    return this.httpClient.get<Commit[]>(`https://api.github.com/repos/angular/angular/commits`, {
      headers,
      params,
      observe: 'response'
    })
  }

  getCommit(ref: string): Observable<Commit> {
    return this.httpClient.get<Commit>(`https://api.github.com/repos/angular/angular/commits/${ref}`, {
      headers
    })
  }
}
