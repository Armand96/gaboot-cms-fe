import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsModalCreateUpdateComponent } from './products-modal-create-update.component';

describe('ProductsModalCreateUpdateComponent', () => {
  let component: ProductsModalCreateUpdateComponent;
  let fixture: ComponentFixture<ProductsModalCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsModalCreateUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsModalCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
