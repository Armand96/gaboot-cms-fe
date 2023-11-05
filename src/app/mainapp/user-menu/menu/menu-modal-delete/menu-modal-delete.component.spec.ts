import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuModalDeleteComponent } from './menu-modal-delete.component';

describe('MenuModalDeleteComponent', () => {
  let component: MenuModalDeleteComponent;
  let fixture: ComponentFixture<MenuModalDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuModalDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuModalDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
