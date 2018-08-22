import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryCatsComponent } from './category-cats.component';

describe('CategoryCatsComponent', () => {
  let component: CategoryCatsComponent;
  let fixture: ComponentFixture<CategoryCatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryCatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryCatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
