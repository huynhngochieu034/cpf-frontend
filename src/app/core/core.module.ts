import { NgModule, SkipSelf, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule, RouteReuseStrategy } from '@angular/router';
import { AuthenticationService } from './authentication/authentication.service';
import { AuthGuard } from './authentication/auth.guard';
import { RouteReusableStrategy } from './route-reusable-strategy';
import { httpInterceptorProviders } from './http/auth-interceptor';


//import { httpInterceptorProviders } from './http/httpInterceptorProviders';



@NgModule({
  imports: [CommonModule, HttpClientModule, TranslateModule, RouterModule],
  providers: [
    AuthenticationService,
    AuthGuard,
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy
    },
    httpInterceptorProviders
  ]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parrentModule: CoreModule
  ) {
    if (parrentModule) {
      throw new Error(`${parrentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }
}
