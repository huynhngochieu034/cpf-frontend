import { Component, OnInit } from '@angular/core';
import { TrafficUrlService } from 'src/app/core/service/traffic-url/traffic-url.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss']
})
export class AddVehicleComponent implements OnInit {
  public vehicle={};
  public id:number;
  public submitted = false;
  public errorMsg = "";
  public checked=true;
  constructor(private mockUpService: TrafficUrlService, private activated: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getIdByParamater();
  }

  getIdByParamater(){
    let ids = parseInt(this.activated.snapshot.paramMap.get("id"));
    this.id=ids;
    if(isNaN(this.id)){
      this.checked=true;
    }else{
      this.mockUpService.getVehicleIdByUser(this.id).subscribe(data => this.vehicle = data);
      this.checked=false;
    }
  }

  onSubmit() {
    this.submitted = true;
    if(isNaN(this.id)){
    this.mockUpService.createVehicleByUser(this.vehicle).subscribe( () => alert("Vehicle created successfully."),
    error => this.errorMsg = error.statusText);
    }else{
      this.mockUpService.updateVehicleByUser(this.vehicle, this.id).subscribe( () => alert("Vehicle updated successfully."),
    error => this.errorMsg = error.statusText);
    }
    
  }

}
