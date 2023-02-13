import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonewbokbmasterComponent } from './bonewbokbmaster.component';

describe('BonewbokbmasterComponent', () => {
  let component: BonewbokbmasterComponent;
  let fixture: ComponentFixture<BonewbokbmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BonewbokbmasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BonewbokbmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
