import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashmapComponent } from './dashmap.component';

describe('DashmapComponent', () => {
  let component: DashmapComponent;
  let fixture: ComponentFixture<DashmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DashmapComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
