import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantregisterComponent } from './applicantregister.component';

describe('ApplicantregisterComponent', () => {
  let component: ApplicantregisterComponent;
  let fixture: ComponentFixture<ApplicantregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicantregisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
