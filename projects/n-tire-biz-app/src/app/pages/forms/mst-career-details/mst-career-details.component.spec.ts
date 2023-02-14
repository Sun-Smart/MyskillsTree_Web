import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MstCareerDetailsComponent } from './mst-career-details.component';

describe('MstCareerDetailsComponent', () => {
  let component: MstCareerDetailsComponent;
  let fixture: ComponentFixture<MstCareerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MstCareerDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MstCareerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
