import { inject } from '@angular/core'
import {CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../_service/account.service'



export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService)
  const router = inject(Router)
  if (accountService.data()?.user) 
    return true;
  router.navigate(['/'])
  return false
};
