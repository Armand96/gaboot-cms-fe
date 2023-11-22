import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesModalDeleteComponent } from './categories-modal-delete.component';

describe('CategoriesModalDeleteComponent', () => {
  let component: CategoriesModalDeleteComponent;
  let fixture: ComponentFixture<CategoriesModalDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesModalDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesModalDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
