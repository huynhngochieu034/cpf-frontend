import { VehInfo } from './VehInfo';

export class PID {
  public Time: string;
  public CalculatedEngineLoad: number;
  public EngineCoolantTemp: number;
  public IntakeMAP: number;
  public EngineRPM: number;
  public ThrottlePosition: number;
  public EngineTorque: number;
  public RunTime: number;
  public VehicleSpeed: number;
  public FuelLevel: number;
  public FuelPressure: number;
  public EngineOilTemp: number;
  public FuelType: number;
  public EthanolFuel: number;
  public EngineFuelRate: number;
  public IntakeAirTemp: number;
  public MAFAirFlow: number;
  public AmbientAirTemp: number;

  public VehicleId: string;
  public GpsLongitude: number;
  public GpsLatitude: number;

  constructor(veh: VehInfo) {
    this.Time = veh.time;
    this.CalculatedEngineLoad = veh.calculatedEngineLoad;
    this.EngineCoolantTemp = veh.engineCoolantTemp;
    this.IntakeMAP = veh.intakeMAP;
    this.EngineRPM = veh.engineRPM;
    this.ThrottlePosition = veh.throttlePosition;
    this.EngineTorque = veh.engineTorque;
    this.RunTime = veh.runTime;
    this.VehicleSpeed = veh.vehicleSpeed;
    this.FuelLevel = veh.fuelLevel;
    this.FuelPressure = veh.fuelPressure;
    this.EngineOilTemp = veh.engineOilTemp;
    this.FuelType = veh.fuelType;
    this.EthanolFuel = veh.ethanolFuel;
    this.EngineFuelRate = veh.engineFuelRate;
    this.IntakeAirTemp = veh.intakeAirTemp;
    this.MAFAirFlow = veh.mafAirFlow;
    this.AmbientAirTemp = veh.ambientAirTemp;

    this.VehicleId = veh.vehicleId;
    this.GpsLongitude = veh.gpsLongitude;
    this.GpsLatitude = veh.gpsLatitude;
  }
}
