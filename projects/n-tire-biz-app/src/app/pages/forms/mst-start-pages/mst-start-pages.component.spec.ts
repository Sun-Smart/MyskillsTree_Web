import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MstStartPagesComponent } from './mst-start-pages.component';

describe('MstStartPagesComponent', () => {
  let component: MstStartPagesComponent;
  let fixture: ComponentFixture<MstStartPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MstStartPagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MstStartPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
