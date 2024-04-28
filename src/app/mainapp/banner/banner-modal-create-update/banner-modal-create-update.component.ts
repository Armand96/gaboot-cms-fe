import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ApiService } from '../../services/api/api.service';
import { constCreateBanner } from '../banner.const';
import { Banner } from '../interface/banner';
import { BannerService } from '../service/banner.service';
import { CreateBannerDTO } from '../interface/banner-create.dto';

@Component({
  selector: 'app-banner-modal-create-update',
  templateUrl: './banner-modal-create-update.component.html',
  styleUrls: ['./banner-modal-create-update.component.css']
})
export class BannerModalCreateUpdateComponent {

    constructor(
        private catSvc: BannerService,
        private fb: FormBuilder,
        private api: ApiService,
    ) {}

    @Input() isOpenedModal: boolean = false;
    @Input() textCreateUpdate: string = '';
    @Input() selectedBanner = new Subject<Banner>();
    @Output() modalEvent = new EventEmitter<boolean>();

    banner = {} as Banner;
    bannerForm = {} as FormGroup;
    fileData = {} as File;

    ngOnInit(): void {
        this.setForm();

        this.selectedBanner.subscribe({
            next: (res) => {
                this.banner = res;
                this.bannerForm.controls['name'].setValue(res.name);
            },
            error: this.api.errorHandler,
        });
    }

    ngOnDestroy(): void {
        this.selectedBanner.unsubscribe();
    }

    setForm() {
        this.bannerForm = this.fb.group({
            name: ['', Validators.required],
            img: [null],
        });
    }

    fileProgress(fileInput: any) {
        this.fileData = <File>fileInput.target.files[0];
    }

    cCloseModal() {
        this.isOpenedModal = false;
        this.modalEvent.emit(false);
        this.bannerForm.controls['img'].setValue("");
        this.fileData = {} as File;
    }

    submitForm(value: CreateBannerDTO) {
        const formData = new FormData();

        formData.append('name', value.name);
        formData.append('img', this.fileData);

        if (this.textCreateUpdate == constCreateBanner) {
            /* CREATE USER */
            this.catSvc.createBanner(formData).subscribe({
                next: (res) => {
                    this.api.successToastr(res.message, 'Success Create');
                    this.setForm();
                },
                error: this.api.errorHandler,
            });
        } else {
            /* UPDATE USER */
            this.catSvc.updateBanner(this.banner.id, formData).subscribe({
                next: (res) => {
                    this.api.successToastr(res.message, 'Success Update');
                },
                error: this.api.errorHandler,
            });
        }

        this.fileData = {} as File;
        this.bannerForm.controls['img'].setValue("");
    }

}
