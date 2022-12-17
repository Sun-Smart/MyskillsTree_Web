import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewskillsearchComponent } from './newskillsearch.component';

describe('NewskillsearchComponent', () => {
  let component: NewskillsearchComponent;
  let fixture: ComponentFixture<NewskillsearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewskillsearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewskillsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
