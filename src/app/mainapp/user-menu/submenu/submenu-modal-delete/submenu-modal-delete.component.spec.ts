import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmenuModalDeleteComponent } from './submenu-modal-delete.component';

describe('SubmenuModalDeleteComponent', () => {
  let component: SubmenuModalDeleteComponent;
  let fixture: ComponentFixture<SubmenuModalDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmenuModalDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmenuModalDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
