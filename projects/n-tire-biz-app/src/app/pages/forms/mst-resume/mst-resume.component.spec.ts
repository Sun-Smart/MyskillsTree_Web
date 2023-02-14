import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MstResumeComponent } from './mst-resume.component';

describe('MstResumeComponent', () => {
  let component: MstResumeComponent;
  let fixture: ComponentFixture<MstResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MstResumeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MstResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
