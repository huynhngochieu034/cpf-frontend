import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (!/^(http|https):/i.test(req.url)) {
      req = req.clone({ url: environment.serverUrl + req.url });
    }
    return next.handle(req);
  }
}
