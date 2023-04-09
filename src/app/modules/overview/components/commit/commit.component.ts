import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DataService } from '../../../../data/service/data.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Commit } from '../../../../data/types/data.model';

@Component({
  selector: 'app-commit',
  templateUrl: './commit.component.html',
  styleUrls: ['./commit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommitComponent implements OnInit {
  commit$?: Observable<Commit>;
  constructor(
    private readonly dataService: DataService,
    private readonly activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    this.commit$ = this.dataService.getCommit(id);
  }
}
