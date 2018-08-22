import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToAdoptComponent } from './to-adopt.component';

describe('ToAdoptComponent', () => {
  let component: ToAdoptComponent;
  let fixture: ComponentFixture<ToAdoptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToAdoptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToAdoptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
