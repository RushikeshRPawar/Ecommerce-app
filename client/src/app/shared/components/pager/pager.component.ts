import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent implements OnInit {
@Input() totalCount: number;
@Input() pageNumber: number;
@Output() pageChangedEvent = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  onPagerChanged(event: any): void
  {
    this.pageChangedEvent.emit(event.page);
  }

}
