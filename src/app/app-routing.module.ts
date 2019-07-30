import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from './shell/shell.service';
import { AuthModule } from './auth/auth.module';

//Declare navigation path
const routes: Routes = [
  // Fallback when no prior route is matched
  Shell.childRoutes([]),
  {
    path: 'auth',
    loadChildren: () => AuthModule
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      useHash: true
      // enableTracing: true // For debug purpose.
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
