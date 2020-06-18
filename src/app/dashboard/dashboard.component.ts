import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import * as Chartist from 'chartist';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {LimitService} from './limit.service';
import {Limit} from './limits.model';
import {ActivatedRoute, Params} from '@angular/router';
import {CountriesData} from 'countries-map';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

    myControl = new FormControl();
    options: string[];
    filteredOptions: Observable<string[]>;
    public limits: Limit[];
    continent: string;
    public mapData: CountriesData = {
        'ES': { 'value': 416 },
        'GB': { 'value': 94 },
        'FR': { 'value': 255 }
    };

    @Output()
    optionSelected: EventEmitter<MatAutocompleteSelectedEvent>;


    constructor(private limitService: LimitService,
                private route: ActivatedRoute) {
    }


    ngOnInit() {
        console.log('init')

        this.route.params
            .subscribe(
                (params: Params) => {
                    this.continent = params.continent;
                    if (this.continent != null) {
                        this.getLimitsContinent(this.continent);
                    }
                }
            );


        if (this.continent == null) {
            this.getLimits();
        } else {
            this.getLimitsContinent(this.continent);
        }
        // this.limits.forEach((element) => {
        //     this.options.push(element.country)
        // });

        // this.options.push('TEST2');


    }


    getLimits = () =>
        this.limitService
            .getLimits()
            .subscribe(res => {
                this.limits = res;
                this.onGetLimits(this.limits)
            })

    getLimitsContinent = (continent: string) =>
        this.limitService
            .getLimitsContinent(continent)
            .subscribe(res => {
                this.limits = res;
                this.onGetLimits(this.limits)
            })

    // Auth Complete
    onGetLimits(data) {
        this.options = [];
        if (this.options.length === 0) {
            data.forEach((element) => {
                this.options.push(element.country)
            });
            this.filteredOptions = this.myControl.valueChanges
                .pipe(
                    startWith(''),
                    map(value => this._filter(value))
                );
        }

    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }

    onSelect(value: string) {
        this.limits = this.limits.filter(
            county => county.country === value);
    }

}

