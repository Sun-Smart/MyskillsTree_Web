import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillenhancerComponent } from './skillenhancer.component';

describe('SkillenhancerComponent', () => {
  let component: SkillenhancerComponent;
  let fixture: ComponentFixture<SkillenhancerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillenhancerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillenhancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
