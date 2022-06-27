import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencydetailsComponent } from './agencydetails.component';

describe('AgencydetailsComponent', () => {
  let component: AgencydetailsComponent;
  let fixture: ComponentFixture<AgencydetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgencydetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencydetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
