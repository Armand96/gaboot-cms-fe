import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CategoriesService } from '../service/categories.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/mainapp/services/api/api.service';
import { constCreateCategory } from '../categories.const';
import { Category } from '../interface/category';
import { CreateCategoryDto } from '../interface/category-create.dto';

@Component({
  selector: 'app-categories-modal-create-update',
  templateUrl: './categories-modal-create-update.component.html',
  styleUrls: ['./categories-modal-create-update.component.css']
})
export class CategoriesModalCreateUpdateComponent implements OnInit, OnDestroy {
    constructor(
        private catSvc: CategoriesService,
        private fb: FormBuilder,
        private api: ApiService,
    ) {}

    @Input() isOpenedModal: boolean = false;
    @Input() textCreateUpdate: string = '';
    @Input() selectedCategory = new Subject<Category>();
    @Output() modalEvent = new EventEmitter<boolean>();

    category = {} as Category;
    categoryForm = {} as FormGroup;
    fileData = {} as File;

    ngOnInit(): void {
        this.setForm();

        this.selectedCategory.subscribe({
            next: (res) => {
                this.category = res;
                this.categoryForm.controls['name'].setValue(res.name);
                this.categoryForm.controls['description'].setValue(res.description);
            },
            error: this.api.errorHandler,
        });
    }

    ngOnDestroy(): void {
        this.selectedCategory.unsubscribe();
    }

    setForm() {
        this.categoryForm = this.fb.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            img: [null],
        });
    }

    fileProgress(fileInput: any) {
        this.fileData = <File>fileInput.target.files[0];
    }

    cCloseModal() {
        this.isOpenedModal = false;
        this.modalEvent.emit(false);
        this.categoryForm.controls['img'].setValue("");
        this.fileData = {} as File;
    }

    submitForm(value: CreateCategoryDto) {
        const formData = new FormData();

        formData.append('name', value.name);
        formData.append('description', value.description);
        formData.append('img', this.fileData);

        if (this.textCreateUpdate == constCreateCategory) {
            /* CREATE USER */
            this.catSvc.createCategory(formData).subscribe({
                next: (res) => {
                    this.api.successToastr(res.message, 'Success Create');
                    this.setForm();
                },
                error: this.api.errorHandler,
            });
        } else {
            /* UPDATE USER */
            this.catSvc.updateCategory(this.category.id, formData).subscribe({
                next: (res) => {
                    this.api.successToastr(res.message, 'Success Update');
                },
                error: this.api.errorHandler,
            });
        }

        this.fileData = {} as File;
        this.categoryForm.controls['img'].setValue("");
    }
}
