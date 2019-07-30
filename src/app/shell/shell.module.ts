import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './shell.component';
import { MaterialModule } from '../material.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule, Routes } from '@angular/router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas, faDesktop } from '@fortawesome/free-solid-svg-icons';
import { FormsModule }   from '@angular/forms';
import {
  fab,
  faGithub,
  faTwitter,
  faMedium,
  faYoutube,
  faInstagram,
  faResearchgate,
  faSearchengin
} from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import {} from '@fortawesome/fontawesome-common-types';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FleetingMapComponent } from './fleeting-map/fleeting-map.component';
import { AboutComponent } from './about/about.component';
import { AllVehicleComponent } from './all-vehicle/all-vehicle.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { ShellroutingModule } from './shellrouting/shellrouting.module';
//import { DialogDynamicThemeComponent } from './dialog-dynamic-theme/dialog-dynamic-theme.component';
//Google map API for Angular
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';
import { OwlModule } from 'ngx-owl-carousel';
import { DashboardComponent } from './all-vehicle/dashboard/dashboard.component';
import { DashmapComponent } from './all-vehicle/dashmap/dashmap.component';
import { SidebarComponent } from './all-vehicle/sidebar/sidebar.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';

library.add(
  fas,
  fab,
  far,
  faGithub,
  faTwitter,
  faMedium,
  faYoutube,
  faInstagram,
  faDesktop,
  faResearchgate,
  faSearchengin
);

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule,
    RouterModule,
    FontAwesomeModule,
    HttpModule,
    OwlModule,
    ShellroutingModule,
    FormsModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyDgYI-L8nXVzQWJpgoHbm4pTMAEInR50TY'
    }),
    AgmSnazzyInfoWindowModule
  ],
  declarations: [
    ShellComponent,
    FleetingMapComponent,
    AboutComponent,
    AllVehicleComponent,
    LandingpageComponent,
    DashboardComponent,
    DashmapComponent,
    SidebarComponent,
    AddVehicleComponent
  ],
  //DialogDynamicThemeComponent
  //entryComponents: [DialogDynamicThemeComponent]
  exports: [RouterModule]
})
export class ShellModule {}
