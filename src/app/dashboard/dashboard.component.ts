import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import * as Chartist from 'chartist';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {LimitService} from './limit.service';
import {Limit} from './limits.model';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    myControl = new FormControl();
    options: string[] = ['Австрия', 'Албания'];
    filteredOptions: Observable<string[]>;
    public limits: Limit[];
    continent: string;

    @Output()
    optionSelected: EventEmitter<MatAutocompleteSelectedEvent>;
    s

    constructor(private limitService: LimitService,
                private route: ActivatedRoute) {
    }


    ngOnInit() {

        this.route.params
            .subscribe(
                (params: Params) => {
                    this.continent = params.continent;
                    if (this.continent != null) {
                        this.getLimitsContinent(this.continent);
                    }
                }
            );
        this.filteredOptions = this.myControl.valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter(value))
            )


        console.log('this.continent', this.continent)
        if (this.continent == null) {
            console.log('cont simple', this.continent)
            this.getLimits();
        } else {
            console.log('cont', this.continent)
            this.getLimitsContinent(this.continent);
        }
        // this.limits.forEach((element) => {
        //     this.options.push(element.country)
        // });

        this.options.push('TEST2');


    }


    getLimits = () =>
        this.limitService
            .getLimits()
            .subscribe(res => (this.limits = res))

    getLimitsContinent = (continent: string) =>
        this.limitService
            .getLimitsContinent(continent)
            .subscribe(res => {
                this.limits = res;
                // this.onGetLimits(res);
            })

    // Auth Complete
    // onGetLimits(data) {
    //     console.log('data', data)
    //     data.forEach((element) => {
    //         this.options.push(element.country)
    //     });
    //     console.log('options', this.options)
    //     this.filteredOptions = this.myControl.valueChanges
    //         .pipe(
    //             startWith(''),
    //             map(value => value.length >= 1 ? this._filter(value) : [])
    //         );
    // }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        this.options.push('TEST3');

        return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }

    onSelect(value: string) {
        console.log(value);
        this.limits = this.limits.filter(
            county => county.country === value);
    }

    // this.dataStorageService.fetchRecipesByCountry(value).subscribe();
    // this.router.navigate(['new'], {relativeTo: this.route});
}

