import {Component, OnInit} from '@angular/core';
import {LimitService} from '../../../dashboard/limit.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';
import {Limit} from '../../../dashboard/limits.model';

@Component({
    selector: 'app-update-country',
    templateUrl: './update-country.component.html',
    styleUrls: ['./update-country.component.css']
})
export class UpdateCountryComponent implements OnInit {

    visible = true;
    selectable = true;
    removable = true;
    addOnBlur = true;
    selectedBindingType: string;
    editBookForm: FormGroup;
    country: Limit;
    news: string;
    selectedLimit: Limit;
    BindingType: any = ['Paperback', 'Case binding', 'Perfect binding', 'Saddle stitch binding', 'Spiral binding'];

    constructor(public fb: FormBuilder,
                private limitService: LimitService,
                private actRoute: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        this.actRoute.params
            .subscribe(
                (params: Params) => {
                    this.getLimitsById(params.country);

                    // this.country = this.getLimitsByCountryName(this.countyName);
                }
            );

        // this.updateBookForm();
    }

    getLimitsById = (county: string) =>
        this.limitService
            .getLimitsByCountryName(county)
            .subscribe(res => {
                this.country = res[0]
                console.log('country!!', this.country)
                // this.editBookForm.setValue(this.country);
                console.log('country!! set', this.country)
                this.news = this.country.news

                this.editBookForm = new FormGroup({
                    country: new FormControl(this.country.country, Validators.required),
                    continent: new FormControl(this.country.continent, Validators.required),
                    news: new FormControl(this.country.news, Validators.required),
                    summary: new FormControl(this.country.summary, Validators.required)
                });
            });


    // /* Update form */
    // updateBookForm() {
    //     this.editBookForm = this.fb.group({
    //         country: ['', [Validators.required]],
    //         continent: ['', [Validators.required]],
    //         // isbn_10: ['', [Validators.required]],
    //         // author_name: ['', [Validators.required]],
    //         // publication_date: ['', [Validators.required]],
    //         // binding_type: ['', [Validators.required]],
    //         // in_stock: ['Yes'],
    //         // languages: ['']
    //     })
    // }





    /* Get errors */
    // public handleError = (controlName: string, errorName: string) => {
    //     return this.editBookForm.controls[controlName].hasError(errorName);
    // }

    /* Date */
    formatDate(e) {
        const convertDate = new Date(e.target.value).toISOString().substring(0, 10);
        this.editBookForm.get('publication_date').setValue(convertDate, {
            onlyself: true
        })
    }

    /* Go to previous page */
    goBack() {
        // this.location.back();
    }

    /* Submit book */

    updateBook() {
        if (window.confirm('Are you sure you wanna update?')) {
            this.limitService.updateLimit(this.country.$id, this.editBookForm.value);
            this.router.navigate(['country-list']);
        }
    }


}
