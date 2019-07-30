import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDynamicThemeComponent } from './dialog-dynamic-theme.component';

describe('DialogDynamicThemeComponent', () => {
  let component: DialogDynamicThemeComponent;
  let fixture: ComponentFixture<DialogDynamicThemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DialogDynamicThemeComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDynamicThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
