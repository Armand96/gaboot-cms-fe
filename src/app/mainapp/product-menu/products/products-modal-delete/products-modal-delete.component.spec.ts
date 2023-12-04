import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsModalDeleteComponent } from './products-modal-delete.component';

describe('ProductsModalDeleteComponent', () => {
  let component: ProductsModalDeleteComponent;
  let fixture: ComponentFixture<ProductsModalDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsModalDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsModalDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
