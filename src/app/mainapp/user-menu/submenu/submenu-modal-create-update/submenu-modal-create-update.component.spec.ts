import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmenuModalCreateUpdateComponent } from './submenu-modal-create-update.component';

describe('SubmenuModalCreateUpdateComponent', () => {
    let component: SubmenuModalCreateUpdateComponent;
    let fixture: ComponentFixture<SubmenuModalCreateUpdateComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SubmenuModalCreateUpdateComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(SubmenuModalCreateUpdateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
