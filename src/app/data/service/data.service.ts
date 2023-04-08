import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Commit} from "../types/data.type";
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private readonly httpClient: HttpClient) { }

  getCommits(): Observable<Commit[]> {
    const headers = new HttpHeaders()
      .set('X-GitHub-Api-Version', '2022-11-28')
    return this.httpClient.get<Commit[]>(`https://api.github.com/repos/angular/angular/commits`, {
      headers
    })
  }

  // getCommit(): Observable<Commit> {
  //   return this.httpClient.get('')
  // }
}
