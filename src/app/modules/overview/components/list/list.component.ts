import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { DataService } from '../../../../data/service/data.service';
import { startOfMonth, subMonths } from 'date-fns';
import { Commit } from '../../../../data/types/data.model';
import { parseLinkHeader } from '@web3-storage/parse-link-header';
import { HttpResponse } from '@angular/common/http';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { DateRange } from '../../../../shared/date.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  commits: Commit[] | null = [];
  collectionSize = 0;
  page = 1;
  pageSize = 15;
  toDate = startOfMonth(new Date());
  toNgbDate: NgbDate | null = null;
  fromDate = subMonths(this.toDate, 1);
  fromNgbDate: NgbDate | null = null;
  constructor(
    private readonly dataService: DataService,
    private readonly cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fromNgbDate = this.getNgDate(this.fromDate);
    this.toNgbDate = this.getNgDate(this.toDate);
    this.getCommits();
  }

  onPageChange(number: number): void {
    this.page = number;
    this.getCommits();
  }

  onRangeChange(dates: DateRange): void {
    this.fromDate = dates.from;
    this.toDate = dates.to;
    this.getCommits();
  }

  private getCollectionSize(response: HttpResponse<any>): number {
    const parsedLinkHeader = parseLinkHeader(response.headers.get('link'));
    const linkHeaderContainsLastValue = Boolean(parsedLinkHeader?.['last']);

    if (!parsedLinkHeader || !linkHeaderContainsLastValue) {
      return this.collectionSize;
    }

    const pages = Number(parsedLinkHeader['last']['page']);
    const perPage = Number(parsedLinkHeader['last']['per_page']);

    return perPage * pages;
  }

  private getCommits(): void {
    this.dataService
      .getCommits(this.fromDate, this.toDate, this.page, this.pageSize)
      .subscribe((response) => {
        this.commits = response.body;
        this.collectionSize = this.getCollectionSize(response);
        this.cdRef.markForCheck();
      });
  }

  private getNgDate(date: Date): NgbDate | null {
    return NgbDate.from({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
    });
  }
}
