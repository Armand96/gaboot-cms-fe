import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerModalCreateUpdateComponent } from './banner-modal-create-update.component';

describe('BannerModalCreateUpdateComponent', () => {
  let component: BannerModalCreateUpdateComponent;
  let fixture: ComponentFixture<BannerModalCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BannerModalCreateUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerModalCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
