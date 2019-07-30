import { Component, OnInit } from '@angular/core';
import { TrafficUrlService } from 'src/app/core/service/traffic-url/traffic-url.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-all-vehicle',
  templateUrl: './all-vehicle.component.html',
  styleUrls: ['./all-vehicle.component.scss']
})
export class AllVehicleComponent implements OnInit {
  public ids=[];
  public dem=0;
  public totalCheckBoxChild:number;
  public isCheckedParent = false;
  public disableDelete = true;
  public vehicleArr=[];
  public errorMsg = "";
  constructor(private mockUpService: TrafficUrlService, private activated: ActivatedRoute,private router:Router) {}
  ngOnInit() {

    this.fecthVehicle();
  }

  /** FECTH DATA FROM RESFUL API */
  private fecthVehicle = () => {
    this.mockUpService.getVehicleByUserId(1).subscribe(data=> this.vehicleArr = data);
  };

  public checkAllChild(){
    if(this.isCheckedParent){
      for(var i=0 ; i < this.vehicleArr.length; i++) {
        this.vehicleArr[i].checked = true;
      }
      this.disableDelete=false;
    }else{
      for(var i=0 ; i < this.vehicleArr.length; i++) {
        this.vehicleArr[i].checked = false;
      }
      this.disableDelete=true;
    }
  }

  public checkParent(vehicle, event){
    this.totalCheckBoxChild = this.vehicleArr.length;
    if(event.target.checked){
      vehicle.checked = true;
      this.disableDelete = false;
    }else{
      vehicle.checked = false;
      if(this.vehicleArr.filter(opt => opt.checked).length == 0){
        this.disableDelete = true;
      }
    }
     this.dem = this.vehicleArr.filter(opt => opt.checked).length;
     if(this.dem == this.totalCheckBoxChild){
      this.isCheckedParent = true;
     }else{
      this.isCheckedParent = false;
     }

  }

  updateVehicle(id){
    this.router.navigate(['/addvehicles', id]);
  }

  deleteVehicle(){
    if(confirm("Are you sure to delete?")){
    var j=0;
   for(var i=0; i< this.vehicleArr.length; i++){
     if(this.vehicleArr[i].checked){
        this.ids[j++] = this.vehicleArr[i].id;
     }
   }
   this.actionDelete();
  }
  }

  actionDelete(){
    console.log(this.ids[0]);
    console.log(this.ids[1]);
     this.mockUpService.deleteVehicleByUser(this.ids).subscribe(
      () => {
        this.ngOnInit(),
        alert("Vechicle deleted successfully.")
      },
      error => this.errorMsg = error.statusText
    )
     
  }

}