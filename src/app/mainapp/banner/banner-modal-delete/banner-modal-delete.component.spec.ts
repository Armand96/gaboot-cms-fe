import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerModalDeleteComponent } from './banner-modal-delete.component';

describe('BannerModalDeleteComponent', () => {
  let component: BannerModalDeleteComponent;
  let fixture: ComponentFixture<BannerModalDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerModalDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerModalDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
