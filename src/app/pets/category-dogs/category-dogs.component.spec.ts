import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDogsComponent } from './category-dogs.component';

describe('CategoryDogsComponent', () => {
  let component: CategoryDogsComponent;
  let fixture: ComponentFixture<CategoryDogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryDogsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryDogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
