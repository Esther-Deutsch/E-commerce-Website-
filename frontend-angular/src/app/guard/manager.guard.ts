import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserServiceService } from '../sevices/user-service.service';

export const managerGuard: CanActivateFn = (route, state) => {

  const userService = inject(UserServiceService);
  const router = inject(Router);

  if(userService.isManager)
    return true;
  return router.navigate(['products']);
};
