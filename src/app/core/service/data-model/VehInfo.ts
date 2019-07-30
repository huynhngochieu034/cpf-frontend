export class VehInfo{
  [x: string]: any;
    constructor(
        public time: string,
        public calculatedEngineLoad: number,
        public engineCoolantTemp: number,
        public intakeMAP: number,
        public engineRPM: number,
        public throttlePosition: number,
        public engineTorque: number,
        public runTime: number,
        public vehicleSpeed: number,
        public fuelLevel: number,
        public fuelPressure: number,
        public engineOilTemp: number,
        public fuelType: number,
        public ethanolFuel: number,
        public engineFuelRate: number,
        public intakeAirTemp: number,
        public mafAirFlow: number,
        public ambientAirTemp: number,
      
        public vehicleId: string,
        public gpsLongitude: number,
        public gpsLatitude: number,
        
    ){}
   
}