import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {LimitService} from '../../../dashboard/limit.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
                private router: Router,
                private location: Location) {
    }

    ngOnInit() {
        this.actRoute.params
            .subscribe(
                (params: Params) => {
                    this.getLimitsById(params.country);
                }
            );

        this.updateBookForm();
    }

    getLimitsById = (county: string) =>
        this.limitService
            .getLimitsByCountryName(county)
            .subscribe(res => {
                this.country = res[0]
                this.news = this.country.news

                this.editBookForm = new FormGroup({
                    country: new FormControl(this.country.country, Validators.required),
                    continent: new FormControl(this.country.continent, Validators.required),
                    news: new FormControl(this.country.news, Validators.required),
                    summary: new FormControl(this.country.summary, Validators.required)
                });
            });


    // /* Update form */
    updateBookForm() {
        this.editBookForm = this.fb.group({
            country: ['', [Validators.required]],
            continent: ['', [Validators.required]],
            news: new FormControl('', Validators.required),
            summary: new FormControl('', Validators.required)
        })
    }





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
        this.location.back();
    }

    /* Submit book */

    updateBook() {
        if (window.confirm('Are you sure you wanna update?')) {
            this.limitService.updateLimit(this.country.$id, this.editBookForm.value);
            this.router.navigate(['/user-profile/list']);
        }
    }


}
