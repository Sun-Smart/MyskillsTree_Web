import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MstSkillDetsilsComponent } from './mst-skill-detsils.component';

describe('MstSkillDetsilsComponent', () => {
  let component: MstSkillDetsilsComponent;
  let fixture: ComponentFixture<MstSkillDetsilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MstSkillDetsilsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MstSkillDetsilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
