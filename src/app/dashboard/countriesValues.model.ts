import {Color} from '@amcharts/amcharts4/core';
import * as am4core from '@amcharts/amcharts4/core';
import {CityValues} from './cityValues.model';

export class CountriesValues {
    public id: string;
    public name: string;
    public fill: Color;
    public capital: CityValues;


    constructor(id: string, name: string, fill: Color, capital: CityValues) {
        this.id = id;
        this.name = name;
        this.fill = fill;
        this.capital = capital;
    }
}

