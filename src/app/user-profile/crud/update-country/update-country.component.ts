import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Location} from '@angular/common';
import {LimitService} from '../../../dashboard/limit.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Limit} from '../../../dashboard/limits.model';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {map, startWith} from 'rxjs/operators';


@Component({
    selector: 'app-update-country',
    templateUrl: './update-country.component.html',
    styleUrls: ['./update-country.component.css']
})
export class UpdateCountryComponent implements OnInit {

    visible = true;
    selectable = true;
    removable = true;
    editBookForm: FormGroup;
    country: Limit;
    news: string;

    // test
    separatorKeysCodes: number[] = [ENTER, COMMA];
    fruitCtrl = new FormControl();
    filteredFruits: Observable<string[]>;
    allowedCountries: string[] = [];
    allCountries: string[] = [];

    @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;


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

        // this.limitService.getCounties();
        this.updateBookForm();
        this.allCountries = Array.from(this.limitService.getCountiesMap().keys())
    }

    getLimitsById = (county: string) =>
        this.limitService
            .getLimitsByCountryName(county)
            .subscribe(res => {
                this.country = res[0]
                this.news = this.country.news
                this.allowedCountries = this.country.allowedCountries

                this.editBookForm = new FormGroup({
                    country: new FormControl(this.country.country, Validators.required),
                    continent: new FormControl(this.country.continent, Validators.required),
                    news: new FormControl(this.country.news, Validators.required),
                    summary: new FormControl(this.country.summary, Validators.required),
                    allowedCountries: new FormControl(this.country.allowedCountries, Validators.required)
                });


                // this.filteredFruits = this.fruitCtrl.valueChanges
                //     .pipe(
                //         startWith(''),
                //         map(value => this._filter(this.allowedCountries))
                //     );
                //

                this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
                    startWith(''),
                    map((fruit: string | null) => fruit ? this._filter(fruit) : this.allCountries.slice()));

            });


    // /* Update form */
    updateBookForm() {
        this.editBookForm = this.fb.group({
            country: ['', [Validators.required]],
            continent: ['', [Validators.required]],
            news: new FormControl('', Validators.required),
            summary: new FormControl('', Validators.required),
            allowedCountries: new FormControl('', Validators.required)
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
            this.editBookForm.value.allowedCountries = this.allowedCountries
            this.limitService.updateLimit(this.country.$id, this.editBookForm.value);
            this.router.navigate(['/user-profile/list']);
        }
    }

    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        // Add our fruit
        if ((value || '').trim()) {
            this.allowedCountries.push(value.trim());
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }

        this.fruitCtrl.setValue(null);
    }

    remove(fruit: string): void {
        const index = this.allowedCountries.indexOf(fruit);

        if (index >= 0) {
            this.allowedCountries.splice(index, 1);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.allowedCountries.push(event.option.viewValue);
        this.fruitInput.nativeElement.value = '';
        this.fruitCtrl.setValue(null);
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.allCountries.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
    }

}
