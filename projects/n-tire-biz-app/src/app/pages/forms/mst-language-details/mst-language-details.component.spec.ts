import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MstLanguageDetailsComponent } from './mst-language-details.component';

describe('MstLanguageDetailsComponent', () => {
  let component: MstLanguageDetailsComponent;
  let fixture: ComponentFixture<MstLanguageDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MstLanguageDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MstLanguageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
