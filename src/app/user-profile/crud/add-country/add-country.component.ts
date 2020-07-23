import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LimitService} from '../../../dashboard/limit.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {startWith, map} from 'rxjs/operators';
import {MatChipInputEvent} from '@angular/material/chips';

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

    fruitCtrl = new FormControl();
    filteredFruits: Observable<string[]>;
    fruits: string[] = ['Lemon'];
    allFruits: string[] = [];

    @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;


    ngOnInit() {
        // this.limitService.GetBookList();
        this.submitBookForm();
    }

    constructor(
        public fb: FormBuilder,
        private limitService: LimitService,
        private router: Router
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

        console.log(this.filteredFruits)
        this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
            startWith(null),
            map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
        console.log(this.filteredFruits)
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
            this.router.navigate(['/user-profile/list']);
        }
    }

    add(event: MatChipInputEvent): void {
        console.log('input')
        const input = event.input;
        const value = event.value;

        // Add our fruit
        if ((value || '').trim()) {
            this.fruits.push(value.trim());
        }

        // Reset the input value
        if (input) {
            input.value = '';
        }

        this.fruitCtrl.setValue(null);
    }

    remove(fruit: string): void {
        const index = this.fruits.indexOf(fruit);

        if (index >= 0) {
            this.fruits.splice(index, 1);
        }
    }

    selected(event: MatAutocompleteSelectedEvent): void {
        this.fruits.push(event.option.viewValue);
        this.fruitInput.nativeElement.value = '';
        this.fruitCtrl.setValue(null);
    }

    private _filter(value: string): string[] {
        console.log(value)
        const filterValue = value.toLowerCase();

        return this.allFruits.filter(fruit => fruit.toLowerCase().indexOf(filterValue) === 0);
    }


}
