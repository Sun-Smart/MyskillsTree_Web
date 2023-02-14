import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BonewtopicComponent } from './bonewtopic.component';

describe('BonewtopicComponent', () => {
  let component: BonewtopicComponent;
  let fixture: ComponentFixture<BonewtopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BonewtopicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BonewtopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
