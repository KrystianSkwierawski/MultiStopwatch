import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute, ActivationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Status } from '../../../web-api-client';

@Injectable({
  providedIn: 'root'
})
export class ItemsStatusService implements OnInit {

  currentStatus = new Subject<Status>();

  queryParams = new Map([
    [Status.Doing, "doing"],
    [Status.Done, "done"],
    [Status.All, "all"]
  ]);

  ngOnInit(): void {

  }

  constructor(private _router: Router, private _activatedRoute: ActivatedRoute) {
    this._router.events.subscribe(event => {
      if (event instanceof ActivationEnd) {
        const queryParam: string = event.snapshot.queryParams["items"];

        let status: Status = this.getStatusByQueryParam(queryParam);

        if (!status)
          status = Status.Doing;

        this.currentStatus.next(status);
      }
    });
  }

  initItemsStatus() {
    const queryParam = this._activatedRoute.snapshot.queryParams['items'];
    let status: Status = this.getStatusByQueryParam(queryParam);

    if (!status)
      status = Status.Doing;

    this.currentStatus.next(status);
  }

  setQueryParams(status: Status) {
    this._router.navigate([], {
      relativeTo: this._activatedRoute, queryParams: {
        items: this.queryParams.get(status)
      }
    });
  }

  private getStatusByQueryParam(queryParams: string): Status {
    return [...this.queryParams].find(([key, value]) => queryParams === value)[0];
  }
}
