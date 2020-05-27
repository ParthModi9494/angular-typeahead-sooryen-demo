import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebounceWithSwitchmapComponent } from './debounce-with-switchmap.component';

describe('DebounceWithSwitchmapComponent', () => {
  let component: DebounceWithSwitchmapComponent;
  let fixture: ComponentFixture<DebounceWithSwitchmapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebounceWithSwitchmapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebounceWithSwitchmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
