import { Injectable } from '@angular/core';
//import { NgxSpinnerService } from 'ngx-spinner/ngx-spinner.module';

@Injectable({
  providedIn: 'root',
})
export class BusyService {
  public busyRequestCount = 0;

 // constructor(private SpinnerService: NgxSpinnerService) { }
  constructor() { }

  public busy() {
    this.busyRequestCount++;
    // this.SpinnerService.show(undefined, {
    //   type: 'line-scale-party',
    //   bdColor: 'rgba(255,255,255,0)',
    //   color: '#333333',
    // });
  }

  public idle() {
    this.busyRequestCount++;
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
  //    this.SpinnerService.hide();
    }
  }

}
