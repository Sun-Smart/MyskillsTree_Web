import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MstapplicantreferenceacceptedComponent } from './mstapplicantreferenceaccepted.component';

describe('MstapplicantreferenceacceptedComponent', () => {
  let component: MstapplicantreferenceacceptedComponent;
  let fixture: ComponentFixture<MstapplicantreferenceacceptedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MstapplicantreferenceacceptedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MstapplicantreferenceacceptedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
