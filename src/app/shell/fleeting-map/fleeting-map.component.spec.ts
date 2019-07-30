import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetingMapComponent } from './fleeting-map.component';

describe('FleetingMapComponent', () => {
  let component: FleetingMapComponent;
  let fixture: ComponentFixture<FleetingMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FleetingMapComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetingMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
