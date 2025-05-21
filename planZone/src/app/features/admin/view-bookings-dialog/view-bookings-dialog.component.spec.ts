import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBookingsDialogComponent } from './view-bookings-dialog.component';

describe('ViewBookingsDialogComponent', () => {
  let component: ViewBookingsDialogComponent;
  let fixture: ComponentFixture<ViewBookingsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewBookingsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewBookingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
