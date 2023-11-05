import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleModalCreateUpdateComponent } from './role-modal-create-update.component';

describe('RoleModalCreateUpdateComponent', () => {
  let component: RoleModalCreateUpdateComponent;
  let fixture: ComponentFixture<RoleModalCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleModalCreateUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleModalCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
