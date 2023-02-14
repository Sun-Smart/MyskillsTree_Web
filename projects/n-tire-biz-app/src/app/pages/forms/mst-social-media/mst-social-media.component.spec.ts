import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MstSocialMediaComponent } from './mst-social-media.component';

describe('MstSocialMediaComponent', () => {
  let component: MstSocialMediaComponent;
  let fixture: ComponentFixture<MstSocialMediaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MstSocialMediaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MstSocialMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
