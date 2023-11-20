import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserModalCreateUpdateComponent } from './user-modal-create-update.component';

describe('UserModalCreateUpdateComponent', () => {
    let component: UserModalCreateUpdateComponent;
    let fixture: ComponentFixture<UserModalCreateUpdateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UserModalCreateUpdateComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(UserModalCreateUpdateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
