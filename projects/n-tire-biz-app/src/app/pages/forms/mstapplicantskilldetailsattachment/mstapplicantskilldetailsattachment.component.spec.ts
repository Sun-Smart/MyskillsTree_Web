import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MstapplicantskilldetailsattachmentComponent } from './mstapplicantskilldetailsattachment.component';

describe('MstapplicantskilldetailsattachmentComponent', () => {
  let component: MstapplicantskilldetailsattachmentComponent;
  let fixture: ComponentFixture<MstapplicantskilldetailsattachmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MstapplicantskilldetailsattachmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MstapplicantskilldetailsattachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
