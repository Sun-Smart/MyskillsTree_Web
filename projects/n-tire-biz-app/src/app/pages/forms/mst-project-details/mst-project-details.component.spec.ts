import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MstProjectDetailsComponent } from './mst-project-details.component';

describe('MstProjectDetailsComponent', () => {
  let component: MstProjectDetailsComponent;
  let fixture: ComponentFixture<MstProjectDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MstProjectDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MstProjectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
