import { Component, OnInit } from '@angular/core';
import { TrafficUrlService } from 'src/app/core/service/traffic-url/traffic-url.service';
import { ActivatedRoute, Router } from '@angular/router';

const USERNAME_KEY = 'AuthUsername';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss']
})
export class AddVehicleComponent implements OnInit {

  vehicle: any = {};
  id: number;
  submitted: boolean = false;
  errorMsg: string = "";
  checked: boolean = true;
  username: string;

  constructor(private mockUpService: TrafficUrlService, private activated: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem(USERNAME_KEY) != null) {
      this.username = localStorage.getItem(USERNAME_KEY);
    } else {
      this.username = sessionStorage.getItem(USERNAME_KEY);
    }
    this.getIdByParamater();
  }

  /** Get id vehicle from router */
  getIdByParamater() {
    let ids = parseInt(this.activated.snapshot.paramMap.get("id"));
    this.id = ids;
    if (isNaN(this.id)) {
      this.checked = true;
    } else {
      this.mockUpService.getVehicleIdByUser(this.id).subscribe(data => this.vehicle = data);
      this.checked = false;
    }
  }

  /**Add and update vehicle */
  onSubmit() {
    this.submitted = true;
    if (isNaN(this.id)) {
      this.mockUpService.createVehicleByUser(this.vehicle,this.username).subscribe(() => alert("Vehicle created successfully."),
        error => this.errorMsg = error.statusText);
    } else {
      this.mockUpService.updateVehicleByUser(this.vehicle, this.id).subscribe(() => alert("Vehicle updated successfully."),
        error => this.errorMsg = error.statusText);
    }

  }

}
