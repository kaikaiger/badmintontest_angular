import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryCourtComponent } from './inquiry-court.component';

describe('InquiryCourtComponent', () => {
  let component: InquiryCourtComponent;
  let fixture: ComponentFixture<InquiryCourtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InquiryCourtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InquiryCourtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
