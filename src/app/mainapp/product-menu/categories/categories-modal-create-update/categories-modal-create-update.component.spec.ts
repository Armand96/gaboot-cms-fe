import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesModalCreateUpdateComponent } from './categories-modal-create-update.component';

describe('CategoriesModalCreateUpdateComponent', () => {
  let component: CategoriesModalCreateUpdateComponent;
  let fixture: ComponentFixture<CategoriesModalCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesModalCreateUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesModalCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
