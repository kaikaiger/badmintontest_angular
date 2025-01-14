import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRentalTimeComponent } from './delete-rental-time.component';

describe('DeleteRentalTimeComponent', () => {
  let component: DeleteRentalTimeComponent;
  let fixture: ComponentFixture<DeleteRentalTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteRentalTimeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteRentalTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
