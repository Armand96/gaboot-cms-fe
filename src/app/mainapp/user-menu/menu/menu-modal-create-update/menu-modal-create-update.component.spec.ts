import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuModalCreateUpdateComponent } from './menu-modal-create-update.component';

describe('MenuModalCreateUpdateComponent', () => {
  let component: MenuModalCreateUpdateComponent;
  let fixture: ComponentFixture<MenuModalCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuModalCreateUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuModalCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
