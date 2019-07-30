import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { AuthenticationService } from './core/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [NGXLogger]
})
export class AppComponent {
  title = 'angular-template';
  constructor(private logger: NGXLogger,private auth: AuthenticationService) {
    this.logger.debug('Your log message goes here');
    this.logger.warn('Your log message goes here');
    this.logger.error('Your log message goes here');
    this.logger.debug('Multiple', 'Argument', 'support');
  }
}
