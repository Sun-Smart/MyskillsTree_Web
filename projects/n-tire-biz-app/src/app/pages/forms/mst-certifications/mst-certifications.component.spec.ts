import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MstCertificationsComponent } from './mst-certifications.component';

describe('MstCertificationsComponent', () => {
  let component: MstCertificationsComponent;
  let fixture: ComponentFixture<MstCertificationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MstCertificationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MstCertificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
