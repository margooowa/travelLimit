import {Color} from '@amcharts/amcharts4/core';
import * as am4core from '@amcharts/amcharts4/core';

export class CityValues {
    public title: string;
    public color: Color;
    public longitude: number;
    public latitude: number;

    constructor(title: string, color: Color, longitude: number, latitude: number) {
        this.title = title;
        this.longitude = longitude;
        this.latitude = latitude;
        this.color = am4core.color('#7cb342');
        console.log('!!!!')
    }
}

