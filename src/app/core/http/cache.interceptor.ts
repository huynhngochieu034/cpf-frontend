import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { HttpCacheService } from './http-cache.service';
import { tap, startWith } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  constructor(private httpCache: HttpCacheService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isCachable(req)) {
      return next.handle(req);
    }

    const cachedResponse = this.httpCache.getCacheData(req.url);

    if (req.headers.get('x-refresh')) {
      const result$ = this.sendRequest(req, next);
      if (cachedResponse) {
        return result$.pipe(startWith(cachedResponse));
      } else {
        return result$;
      }
    }

    if (cachedResponse) {
      return of(cachedResponse);
    } else {
      return this.sendRequest(req, next);
    }
  }

  private isCachable(req: HttpRequest<any>) {
    return req.method === 'GET';
  }

  private sendRequest(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.httpCache.setCacheData(req.url, event);
        }
      })
    );
  }
}
