import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ShellComponent } from '../shell.component';

import { FleetingMapComponent } from '../fleeting-map/fleeting-map.component';
import { AboutComponent } from '../about/about.component';
import { AllVehicleComponent } from '../all-vehicle/all-vehicle.component';
import { LandingpageComponent } from '../landingpage/landingpage.component';
import { ShellModule } from '../shell.module';
import { IsAdminGuard } from 'src/app/core/Guards/is-admin.guard';
import { DashboardComponent } from '../all-vehicle/dashboard/dashboard.component';
import { DashmapComponent } from '../all-vehicle/dashmap/dashmap.component';
import { AddVehicleComponent } from '../add-vehicle/add-vehicle.component';

const shell_routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    canActivate: [IsAdminGuard],
    children: [
      { path: 'car', component: AllVehicleComponent},
      { path: 'home', component: LandingpageComponent },
      { path: 'map', component: FleetingMapComponent },
      { path: 'about', component: AboutComponent },
      { path: 'addvehicles', component: AddVehicleComponent },
      { path:'addvehicles/:id', component: AddVehicleComponent},
      {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
          { path: 'dashstat', component: DashboardComponent },
          { path: 'dashmap', component: DashmapComponent }
        ]
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(shell_routes)],
  exports: [RouterModule]
})
export class ShellroutingModule {}
