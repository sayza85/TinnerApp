import { inject, Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import { throwError } from 'rxjs'
import { state } from '@angular/animations'
import { error } from 'elysia';
@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private router = inject(Router)
  private snackbar = inject(MatSnackBar)
  private snackBarConfig :MatSnackBarConfig = {
    horizontalPosition: 'right',
    verticalPosition:'bottom'
  }
  constructor() { }
  
  handleError(err: any) {
    if (err) {
      switch (err.status) {
        case 400:
          this.snackbar.open('Bad Request นะครับผม นะครับเนอะ🤯','OK',this.snackBarConfig)
          break
        case 404:
         this.router.navigate(['/404'])
          break
      case 500:
      case 501:
      case 502:
      case 503:
      case 504:
      case 505:
      case 506:
      case 507:
      case 508:
      case 509:
      case 510:
      case 511:
       
        if (err.error.message === 'Token has expired') {
          this.router.navigate(['/'])
        }
        const navExtras: NavigationExtras = {
          state: {
            message: err.error,
            code: err.status
          }
        }
        this.router.navigate(['/server-error'],navExtras)
        break
      default:
        this.snackbar.open("Something went wrong , Please try again later",'OK',this.snackBarConfig)
        break
    }
    }
    return throwError(() => err)
  }
}
