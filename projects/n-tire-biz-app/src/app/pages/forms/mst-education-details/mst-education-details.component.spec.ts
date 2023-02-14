import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MstEducationDetailsComponent } from './mst-education-details.component';

describe('MstEducationDetailsComponent', () => {
  let component: MstEducationDetailsComponent;
  let fixture: ComponentFixture<MstEducationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MstEducationDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MstEducationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
