import {
    AfterContentInit,
    AfterViewChecked, AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Inject,
    Injectable,
    OnInit,
    Output,
    QueryList, Renderer2, ViewChild,
    ViewChildren
} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {Observable} from 'rxjs';
import {filter, map, startWith, withLatestFrom} from 'rxjs/operators';
import {LimitService} from './limit.service';
import {Limit} from './limits.model';
import {ActivatedRoute, Params, Router, Scroll} from '@angular/router';
import {DOCUMENT, ViewportScroller} from '@angular/common';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterContentInit, AfterViewInit {


    myControl = new FormControl();
    options: string[];
    filteredOptions: Observable<string[]>;
    public limits: Limit[];
    filterValue: string;

    continent: string;
    @ViewChild('divs') el: ElementRef;
    listener;

    @Output()
    optionSelected: EventEmitter<MatAutocompleteSelectedEvent>;


    constructor(private limitService: LimitService,
                private route: ActivatedRoute,
                private rd: Renderer2) {
        this.listener = this.rd.listen('window', 'scroll', (e) => {
            console.log(this.getYPosition(e));
        });
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
        if (this.continent == null) {
            this.getLimits();
        } else {
            this.getLimitsContinent(this.continent);
        }


    }


    getLimits = () =>
        this.limitService
            .getLimits()
            .subscribe(res => {
                this.limits = res;
                this.onGetLimits(this.limits)
            })

    getLimitsContinent = (continent: string) => {
        return this.limitService
            .getLimitsContinent(continent)
            .subscribe(res => {
                this.limits = res;
                this.onGetLimits(this.limits);
            });
    }

    getLimitsCounty = (countryName: string) =>
        this.limitService
            .getLimitsByCountryName(countryName)
            .subscribe(res => {
                this.limits = res;
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
        // console.log(this.el.nativeElement)
        // console.log(this.el.nativeElement.childNodes.length)
        // const querySelector = this.el.nativeElement.childNodes.item('countryjL0sHEwPnLsPiPc3oAwn');
        // console.log(querySelector)
        // const element = document.getElementById('qMAq7L9kIZaBCQ6BVgWa');
        // console.log(element)
        // setTimeout(() => {
        //     element.scrollIntoView({block: 'start', behavior: 'smooth', inline: 'nearest'});
        // }, 200)
    }

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.options.filter(option => option.toLowerCase().includes(filterValue));
    }

    onSelect(event: MatAutocompleteSelectedEvent, autoInput: HTMLInputElement) {
        autoInput.value = '';
        autoInput.blur();
        event.option.deselect();
        this.getLimitsCounty(event.option.value);
        this.filteredOptions = this.myControl.valueChanges
            .pipe(
                startWith(''),
                map(value => this._filter(value))
            );
    }

    ngAfterContentInit(): void {
        // let elementById = document.getElementById('countryzlSjGVDeStwAnrMs4cpS') as HTMLElement;
        // console.log(elementById)
    }


    ngAfterViewInit() {
        // console.log(this.rd);
        // this.el.nativeElement.focus();      //<<<=====same as oldest way
        // const element = document.getElementById('qMAq7L9kIZaBCQ6BVgWa');
        // console.log(element)
    }

    getYPosition(e: Event): number {
        return (e.target as Element).scrollTop;
    }
}

