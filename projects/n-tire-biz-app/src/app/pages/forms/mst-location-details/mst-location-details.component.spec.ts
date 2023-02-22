import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MstLocationDetailsComponent } from './mst-location-details.component';

describe('MstLocationDetailsComponent', () => {
  let component: MstLocationDetailsComponent;
  let fixture: ComponentFixture<MstLocationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MstLocationDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MstLocationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
