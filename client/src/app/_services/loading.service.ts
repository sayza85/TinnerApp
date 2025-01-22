import { inject, Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner'

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loaddigRequestCount = 0
  
  private spinner= inject(NgxSpinnerService)
  constructor() { }

  loading() { 
    this.loaddigRequestCount++
    this.spinner.show(undefined, {
      type: "square-jelly-box" ,
      bdColor: 'rgba(0, 0, 0, 0.8)',
      color: '#fff',
      fullScreen: false
    })
  }
  
  idle() {
    this.loaddigRequestCount--
    if (this.loaddigRequestCount <= 0) {
      this.loaddigRequestCount = 0
      this.spinner.hide()
    }
  }
}
