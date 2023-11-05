import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleModalDeleteComponent } from './role-modal-delete.component';

describe('RoleModalDeleteComponent', () => {
  let component: RoleModalDeleteComponent;
  let fixture: ComponentFixture<RoleModalDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleModalDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleModalDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
