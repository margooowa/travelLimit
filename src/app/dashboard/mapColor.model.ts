import {Color} from '@amcharts/amcharts4/core';

export class MapColor {
    public id: string;
    public fill: Color;
    public capital: string;

    constructor(id: string, fill: Color, capital: string) {
        this.id = id;
        this.fill = fill;
        this.capital = capital;
    }
}
