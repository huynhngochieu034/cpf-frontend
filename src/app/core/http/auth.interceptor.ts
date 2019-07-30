import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthenticationService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.auth.credentials.token;

    if (authToken) {
      const authReq = req.clone({
        headers: req.headers.set('Authorization', authToken)
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
