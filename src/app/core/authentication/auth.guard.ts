import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { NGXLogger } from 'ngx-logger';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private logger: NGXLogger
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authenticationService.isAuthenticated()) {
      return this.authenticationService.isAuthenticated();
    }
    this.logger.debug('Not authenticated, redirecting...');
    this.router.navigate(['/auth/login'], { replaceUrl: true });
  }
}
