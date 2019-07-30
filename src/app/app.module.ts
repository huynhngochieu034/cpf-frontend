import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';


//Angular Module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

//Angular User Module
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { ShellModule } from './shell/shell.module';
import { CoreModule } from './core/core.module';




@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule,
    ShellModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LoggerModule.forRoot({
      level: NgxLoggerLevel.DEBUG
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
