import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

//Angular GoogleMap

import { TrafficUrlService } from '../../core/service/traffic-url/traffic-url.service';
import { Subscription } from 'rxjs';

import { PID } from 'src/app/core/service/data-model/PIDmodel';
import * as $ from 'jquery';
import * as infoDOM from '../../core/service/data-model/TemplCar.json';
import { ActivatedRoute } from '@angular/router';
import { VehInfo } from 'src/app/core/service/data-model/VehInfo';

@Component({
  selector: 'app-fleeting-map',
  templateUrl: './fleeting-map.component.html',
  styleUrls: ['./fleeting-map.component.scss']
})
export class FleetingMapComponent implements OnInit, AfterViewInit {

  constructor(private mockUpService: TrafficUrlService, private activated: ActivatedRoute) {}

  maxZoomLevel:boolean=false;
  sizeVehicles:number=0;
  dem:number=0;
  public ids=[];
  public vehicleArr2=[];
  public checkedVehicleArr=[];
  public tempVehicleIdArr:any[]=[];

  labelOptions={};
  isCollapsed= false;
  totalCheckBoxChild:number;
  isCheckedParent:boolean = false;
  disableDelete:boolean = true;

  /**CENTERALIZE MAP */
  originlat: Number = 10.817996728;
  originlng: Number = 106.651164062;
  zoom: Number = 14;
  iconCircleMap='assets/icons/icon-circlemap.png';
  iconLink = 'assets/img/car_normal.png';
  iconWarning = 'assets/img/car_warning.png';
  iconAlert = 'assets/img/car_alert.png';
  mapSpot = 'assets/img/map-spot_2.png';
  zoomOptz: Number = 2;
  overView: Boolean = false;
  /**Handler Variable for returned data */
  public mockupData: Subscription;
  public globMarker = {
    CarStat: [],
    CarMark: []
  };
  public vehicleArr = [];
  public testInterval;
  public carSetID;
  public carSetPathIndex;

  finishedFirtFetch = false;
  ngOnInit() {
   
    /**get subscription mockup data */
    this.fecthVehicle2();
   
    // this.fecthVehicle();
    console.log(this.ids);
    if(this.ids!==[]){
      while (this.finishedFirtFetch == false) {}
      this.testInterval = setInterval(() => {
        this.fecthLastVehicle2();
      }, 5000);
    }
   
   
    $(document).ready(function() {
      /**Fix height of MAP window */
      var outletH = $('.row').outerHeight();
      console.log('out-let content Height: ', outletH);
      $('#agmMap').css({
        height: outletH
      });
    });
  }
  /**After View Configuration */
  ngAfterViewInit() {}
  /** FIT BOUNDDARY */

/** FECTH DATA FROM RESFUL API DEMO */
  private fecthVehicle2 = () => {
    this.mockUpService.getALLVehicle().subscribe(data=> this.checkedVehicleArr = data);
    //     this.mockupData = this.mockUpService.getALLVehicle().subscribe((res: any) => {
    //   // console.log(res)
    //   res.forEach(value => {
    //     let vehInfo: VehInfo = JSON.parse(value);
    //     let ret = new PID(vehInfo);
    //     console.log(ret);
    //     if (this.vehicleArr == null || this.vehicleArr.indexOf(ret.VehicleId) == -1) {
    //       console.log(`Initializing ${ret.VehicleId} DB...`);

    //       /**Store All Newly Created CarID to an Array */
    //       //this.vehicleArr.push(ret.VehicleId);
    //       this.checkedVehicleArr.push(ret);
    //       /**Store All Newly Created Car's STATUS to Json object and set Boundary*/
    //       this.newVehicleStat(ret);
    //     } else {
    //       /**Update CarStat */
    //       console.log(
    //         `Update ${ret.VehicleId} DB Status at GpsLongitude: ${ret.GpsLongitude} || GpsLatitude: ${ret.GpsLatitude}`
    //       );
    //       this.updateVehicleStat(ret);
    //     }
    //   });
    //   // console.log(this.globMarker);
    // });
    this.finishedFirtFetch = true;
};

private fecthLastVehicle2 = () => {
  this.mockupData = this.mockUpService.getVehicleById(this.ids).subscribe((res: any) => {
    // console.log(res)
    res.forEach(value => {
      let vehInfo: VehInfo = value;
      let ret = new PID(vehInfo);
      console.log(ret);
      if (this.vehicleArr2 == null || this.vehicleArr2.indexOf(ret.VehicleId) == -1) {
        console.log(`Initializing ${ret.VehicleId} DB...`);

        /**Store All Newly Created CarID to an Array */
        this.vehicleArr2.push(ret.VehicleId);

        /**Store All Newly Created Car's STATUS to Json object and set Boundary*/
        this.newVehicleStat(ret);
      } else {
        /**Update CarStat */
        console.log(
          `Update ${ret.VehicleId} DB Status at GpsLongitude: ${ret.GpsLongitude} || GpsLatitude: ${ret.GpsLatitude}`
        );
        this.updateVehicleStat(ret);
      }
    });
     console.log(this.globMarker);
     
  });
};



  /** FECTH DATA FROM RESFUL API */
  // private fecthVehicle = () => {
  //   this.mockupData = this.mockUpService.getAllJSON().subscribe((res: any) => {
  //     // console.log(res)
  //     res.forEach(value => {
  //       let vehInfo: VehInfo = JSON.parse(value);
  //       let ret = new PID(vehInfo);
  //       console.log(ret);
  //       if (this.vehicleArr == null || this.vehicleArr.indexOf(ret.VehicleId) == -1) {
  //         console.log(`Initializing ${ret.VehicleId} DB...`);

  //         /**Store All Newly Created CarID to an Array */
  //         this.vehicleArr.push(ret.VehicleId);

  //         /**Store All Newly Created Car's STATUS to Json object and set Boundary*/
  //         this.newVehicleStat(ret);
  //       } else {
  //         /**Update CarStat */
  //         console.log(
  //           `Update ${ret.VehicleId} DB Status at GpsLongitude: ${ret.GpsLongitude} || GpsLatitude: ${ret.GpsLatitude}`
  //         );
  //         this.updateVehicleStat(ret);
  //       }
  //     });
  //     // console.log(this.globMarker);
  //   });
  //   this.finishedFirtFetch = true;
  // };

  // private fecthLastVehicle = () => {
  //   this.mockupData = this.mockUpService.getLastJSON().subscribe((res: any) => {
  //     // console.log(res)
  //     res.forEach(value => {
  //       let vehInfo: VehInfo = JSON.parse(value);
  //       let ret = new PID(vehInfo);
  //       console.log(ret);
  //       if (this.vehicleArr == null || this.vehicleArr.indexOf(ret.VehicleId) == -1) {
  //         console.log(`Initializing ${ret.VehicleId} DB...`);

  //         /**Store All Newly Created CarID to an Array */
  //         this.vehicleArr.push(ret.VehicleId);

  //         /**Store All Newly Created Car's STATUS to Json object and set Boundary*/
  //         this.newVehicleStat(ret);
  //       } else {
  //         /**Update CarStat */
  //         console.log(
  //           `Update ${ret.VehicleId} DB Status at GpsLongitude: ${ret.GpsLongitude} || GpsLatitude: ${ret.GpsLatitude}`
  //         );
  //         this.updateVehicleStat(ret);
  //       }
  //     });
  //     // console.log(this.globMarker);
  //   });
  // };
  /** ADD NEW Member */
  private newVehicleStat = (ret: PID) => {
    let markValue: any = {
      path: [],
      icon: this.iconLink,
      lat: ret.GpsLatitude,
      lng: ret.GpsLongitude,
      warning: 'normalSpeed'
    };
    let statValue: any = {
      list: []
    };
    statValue.list.push(ret);
    this.globMarker.CarStat[`${ret.VehicleId}`] = statValue;
    this.globMarker.CarMark[`${ret.VehicleId}`] = markValue;
  };
  /** Update STATUS of Vehicle */
  private updateVehicleStat = (ret: PID) => {
    let updateMark = this.globMarker.CarMark[`${ret.VehicleId}`];
    updateMark.lat = ret.GpsLatitude;
    updateMark.lng = ret.GpsLongitude;

    if (ret.VehicleSpeed > infoDOM.CAR_RULE.OVER_SPEED) {
      updateMark.icon = this.iconAlert;
    } else if (ret.VehicleSpeed > infoDOM.CAR_RULE.HIGH_SPEED) {
      updateMark.icon = this.iconWarning;
    } else {
      updateMark.icon = this.iconLink;
    }
    updateMark.path.push({
      gpslat: ret.GpsLatitude,
      gpslng: ret.GpsLongitude,
      now: ret.Time,
      speed: ret.VehicleSpeed,
      fuel: ret.FuelLevel,
      temp: ret.IntakeAirTemp
    });
    this.globMarker.CarStat[`${ret.VehicleId}`].list.push(ret);
  };
  /** ngFor Optimization */
  public trackByFunction(index, item) {
    if (!item) return null;
    return index;
  }
  /** Checking Methods */
  infoID = (ID: string, i: number) => {
    console.log(`Car ${ID} has been chosen`);
    this.carSetID = ID;
    this.carSetPathIndex = i;
  };
  public SetVehID = (ID: string) => {
    console.log(`Car ${ID} has been chosen`);
    this.carSetID = ID;
    this.carSetPathIndex = this.globMarker.CarMark[this.carSetID].path.length -1;
  };
  checkZoom = event => {
    console.log('Map Zoom level: ', event);
    this.overView = true;
    if(event <= 10){
      this.labelOptions= {
        color: 'white',
        fontFamily: 'Times New Roman',
        fontSize: '30px',
        fontWeight: 'bold',
        text: this.vehicleArr2.length.toString(),
        }
      this.maxZoomLevel=true;
    }
    else{
      this.maxZoomLevel=false;
    }
    if (event >= 19) {
      this.zoomOptz = 4;
    } else if (event > 17 && event < 19) {
      this.zoomOptz = 10;
    } else {
      this.overView = false;
    }
    console.log('Map Zoom Optz: ', this.zoomOptz);
  };
  getTime = () => {
    let date = Date();
    return date;
  };
  ngOnDestroy() {
    if (this.mockupData) {
      this.mockupData.unsubscribe();
    }
    if (this.testInterval) {
      clearInterval(this.testInterval);
    }
  }

  checkAllChild(){
    if(this.isCheckedParent){
      for(var i=0 ; i < this.checkedVehicleArr.length; i++) {
        this.checkedVehicleArr[i].checked = true;
      }
      this.disableDelete=false;
    }else{
      for(var i=0 ; i < this.checkedVehicleArr.length; i++) {
        this.checkedVehicleArr[i].checked = false;
      }
      this.disableDelete=true;
    }
  }

  checkParent(vehicle, event){
    this.totalCheckBoxChild = this.checkedVehicleArr.length;
    if(event.target.checked){
      vehicle.checked = true;
      this.disableDelete = false;
    }else{
      vehicle.checked = false;
      if(this.checkedVehicleArr.filter(opt => opt.checked).length == 0){
        this.disableDelete = true;
      }
    }
     this.dem = this.checkedVehicleArr.filter(opt => opt.checked).length;
     if(this.dem == this.totalCheckBoxChild){
      this.isCheckedParent = true;
     }else{
      this.isCheckedParent = false;
     }

  }

  affectGoogleMap(){
    var j=0;
    this.ids =[];
    this.vehicleArr2 =[];
    //this.ngOnInit();
   // this.finishedFirtFetch = false;
  
    for(var i=0; i< this.checkedVehicleArr.length; i++){
      if(this.checkedVehicleArr[i].checked){
         this.ids[j] = this.checkedVehicleArr[i].vehicleId;
         console.log("Gia tri la: "+this.ids[j]);
         j++;
      }
    }
    
  }
  
}
