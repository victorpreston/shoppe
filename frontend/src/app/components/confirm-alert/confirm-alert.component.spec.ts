import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAlertComponent } from './confirm-alert.component';

describe('ConfirmAlertComponent', () => {
  let component: ConfirmAlertComponent;
  let fixture: ComponentFixture<ConfirmAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmAlertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
