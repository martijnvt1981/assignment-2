import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {DataService} from "../../../../data/service/data.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {
  commits$ = this.dataService.getCommits();
  constructor(private readonly dataService: DataService) {
  }
}
