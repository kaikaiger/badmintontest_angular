import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourtStatusComponent } from './court-status.component';

describe('CourtStatusComponent', () => {
  let component: CourtStatusComponent;
  let fixture: ComponentFixture<CourtStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourtStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourtStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
