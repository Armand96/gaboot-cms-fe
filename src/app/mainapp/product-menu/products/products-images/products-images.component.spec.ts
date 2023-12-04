import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsImagesComponent } from './products-images.component';

describe('ProductsImagesComponent', () => {
  let component: ProductsImagesComponent;
  let fixture: ComponentFixture<ProductsImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsImagesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
