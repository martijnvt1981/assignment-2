import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DataService} from "../../../../data/service/data.service";
import {startOfMonth, subMonths} from 'date-fns';
import {Commit} from "../../../../data/types/data.type";
import {parseLinkHeader} from "@web3-storage/parse-link-header";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
  commits?: Commit[];
  collectionSize = 0;
  page = 1;
  pageSize = 15;
  until = startOfMonth(new Date());
  since = subMonths(this.until, 1);

  constructor(private readonly dataService: DataService, private readonly cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getCommits()
  }

  onPageChange(number: number): void {
    this.page = number;
    this.getCommits();
  }

  private getCollectionSize(response: HttpResponse<any>): number {
    const parsedLinkHeader = parseLinkHeader(response.headers.get('link'));
    if (!parsedLinkHeader) {
      return 0
    }
    const pages = Number(parsedLinkHeader['last']['page']);
    const perPage = Number(parsedLinkHeader['last']['per_page']);
    return perPage * pages
  }

  private getCommits(): void {
    this.dataService.getCommits(this.since, this.until, this.page, this.pageSize).subscribe(response => {
      this.commits = response.body;
      this.collectionSize ||= this.getCollectionSize(response);
      this.cdRef.markForCheck();
    })
  }
}
