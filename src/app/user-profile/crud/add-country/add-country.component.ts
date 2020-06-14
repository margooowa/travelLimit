import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LimitService} from '../../../dashboard/limit.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
    selector: 'app-add-country',
    templateUrl: './add-country.component.html',
    styleUrls: ['./add-country.component.css']
})
export class AddCountryComponent implements OnInit {
    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    @ViewChild('resetBookForm') myNgForm;
    readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    selectedBindingType: string;
    countryForm: FormGroup;
    BindingType: any = ['Paperback', 'Case binding', 'Perfect binding', 'Saddle stitch binding', 'Spiral binding'];

    ngOnInit() {
        // this.limitService.GetBookList();
        this.submitBookForm();
    }

    constructor(
        public fb: FormBuilder,
        private limitService: LimitService
    ) {
    }


    /* Reactive book form */
    submitBookForm() {
        this.countryForm = this.fb.group({
            country: ['', [Validators.required]],
            continent: ['', [Validators.required]],
            summary: ['', [Validators.required]],
            news: ['', [Validators.required]]
        })
    }

    // /* Get errors */
    // public handleError = (controlName: string, errorName: string) => {
    //     return this.countryForm.controls[controlName].hasError(errorName);
    // }


    /* Date */
    formatDate(e) {
        const convertDate = new Date(e.target.value).toISOString().substring(0, 10);
        this.countryForm.get('publication_date').setValue(convertDate, {
            onlyself: true
        })
    }

    /* Reset form */
    resetForm() {
        this.countryForm.reset();
        Object.keys(this.countryForm.controls).forEach(key => {
            this.countryForm.controls[key].setErrors(null)
        });
    }

    /* Submit book */
    submitBook() {
        if (this.countryForm.valid) {
            this.limitService.addLimit(this.countryForm.value)
            this.resetForm();
        }
    }


}
