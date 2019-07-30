import { Routes, Route } from '@angular/router';

import { ShellComponent } from './shell.component';
import { AuthGuard } from '../core/authentication/auth.guard';
/**
 * Provides helper methods to create routes.
 */

export class Shell {
  /**
   * Creates routes using the shell component and authentication.
   * @param routes The routes to add.
   */
  static childRoutes(routes: Routes): Route {
    return {
      path: '',
      component: ShellComponent,
      children: routes,
      canActivate: [AuthGuard],
      // Reuse ShellComponent instance when navigating between child views
      data: { reuse: true }
    };
  }
}
