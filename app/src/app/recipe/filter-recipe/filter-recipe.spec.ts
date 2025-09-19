import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterRecipe } from './filter-recipe';

describe('FilterRecipe', () => {
  let component: FilterRecipe;
  let fixture: ComponentFixture<FilterRecipe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterRecipe]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterRecipe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
