import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BsuyService {
busyCounter = 0;
  constructor(private spinnerService: NgxSpinnerService) { }

  busy(): void
  {
    this.busyCounter ++;
    this.spinnerService.show(undefined, {
      type: 'timer',
      bdColor: 'rgba(255,255,255,0.7)',
      color: '#333333'
    });
  }

  idle(): void
  {
    this.busyCounter --;
    if (this.busyCounter <= 0)
    {
      this.busyCounter = 0;
      this.spinnerService.hide();
    }
  }
}
