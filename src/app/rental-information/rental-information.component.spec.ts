import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalInformationComponent } from './rental-information.component';

describe('RentalInformationComponent', () => {
  let component: RentalInformationComponent;
  let fixture: ComponentFixture<RentalInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentalInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentalInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
