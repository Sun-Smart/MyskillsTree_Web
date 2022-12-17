import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyscreenComponent } from './verifyscreen.component';

describe('VerifyscreenComponent', () => {
  let component: VerifyscreenComponent;
  let fixture: ComponentFixture<VerifyscreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyscreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyscreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
