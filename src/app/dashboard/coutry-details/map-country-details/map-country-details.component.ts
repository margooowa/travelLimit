import {AfterViewInit, Component, ElementRef, Input, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Limit} from '../../limits.model';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import * as am4maps from '@amcharts/amcharts4/maps';
import am4lang_ru_RU from '@amcharts/amcharts4/lang/ru_RU';
import am4geodata_lang_RU from '@amcharts/amcharts4-geodata/lang/RU';
import * as am4core from '@amcharts/amcharts4/core';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import {DialogCountryComponent} from '../../mapchart/mapchart.component';
import {MapColor} from '../../mapColor.model';
import {LimitService} from '../../limit.service';
import {CityValues} from 'app/dashboard/cityValues.model';

@Component({
    selector: 'app-map-country-details',
    templateUrl: './map-country-details.component.html',
    styleUrls: ['./map-country-details.component.css']
})
export class MapCountryDetailsComponent implements OnInit, AfterViewInit, OnDestroy {


    @ViewChild('chartdiv')
    private chartDom: ElementRef;

    @Input() countryMap: Limit;
    public cities: CityValues[] = [];
    private citiesMap: Map<string, CityValues> = new Map<string, CityValues>();
    private dataColor: MapColor[] = [];


    @Input()
    set country(country: Limit) {
        this.countryMap = country;
    }

    get country(): Limit {
        return this.countryMap
    }

    isShow() {
        if (this.countryMap.country === 'Украина') {
            return true;
        }
        return false;
    };


    constructor(private zone: NgZone, private router: Router, public dialog: MatDialog, private limitService: LimitService) {
    }

    private chart: am4maps.MapChart;


    ngOnInit(): void {
        this.getCities();
    }


    ngAfterViewInit() {
        // this.router.navigate(['/user-profile']);
        if (this.countryMap.country === 'Украина') {
            am4core.useTheme(am4themes_animated);
            this.zone.runOutsideAngular(() => {

                // Create map instance
                this.chart = am4core.create(this.chartDom.nativeElement, am4maps.MapChart);
                this.chart.language.locale = am4lang_ru_RU;
                this.chart.geodataNames = am4geodata_lang_RU;

// Set map definition
                this.chart.geodata = am4geodata_worldLow;

// Set projection
                this.chart.projection = new am4maps.projections.Miller();

// Create map polygon series
                let polygonSeries = this.chart.series.push(new am4maps.MapPolygonSeries());

// Exclude Antartica
                polygonSeries.exclude = ['AQ'];

// Make map load polygon (like country names) data from GeoJSON
                polygonSeries.useGeodata = true;

// Configure series
                let polygonTemplate = polygonSeries.mapPolygons.template;

                // polygonTemplate.events.on('hit', function (ev) {
                //     // get object info
                //     console.log(ev.target.dataItem.dataContext);
                //     console.log(this.countryMap)
                //     const dialogRef = this.dialog.open(DialogCountryComponent);
                //
                //     dialogRef.afterClosed().subscribe(result => {
                //         console.log(`Dialog result: ${result}`);
                //     });
                //     // this.router.navigate(['/dashboard/%D0%98%D0%BD%D0%B4%D0%B8%D1%8F']);
                // }, this);
                polygonTemplate.tooltipText = '{name}';
                polygonTemplate.polygon.fillOpacity = 0.6;

                let color = am4core.color('#7cb342');
                let map1: MapColor = new MapColor('BS', color, 'Paris');
                let map2: MapColor = new MapColor('MV', color, 'Paris');
                let map3: MapColor = new MapColor('TR', color, 'Paris');
                let map4: MapColor = new MapColor('FR', color, 'Paris');
                let map5: MapColor = new MapColor('UA', color, 'Paris');
                this.dataColor.push(map1);
                this.dataColor.push(map2);
                this.dataColor.push(map3);
                this.dataColor.push(map4);
                this.dataColor.push(map5);
                polygonSeries.data = this.dataColor;

                polygonTemplate.propertyFields.fill = 'fill';


                // Zoom control
                this.chart.zoomControl = new am4maps.ZoomControl();


// Create hover state and set alternative fill color
                let hs = polygonTemplate.states.create('hover');
                hs.properties.fill = this.chart.colors.getIndex(0);

// Add image series
                let imageSeries = this.chart.series.push(new am4maps.MapImageSeries());
                imageSeries.mapImages.template.propertyFields.longitude = 'longitude';
                imageSeries.mapImages.template.propertyFields.latitude = 'latitude';
                imageSeries.mapImages.template.tooltipText = '{title}';
                imageSeries.mapImages.template.propertyFields.url = 'url';

                let circle = imageSeries.mapImages.template.createChild(am4core.Circle);
                circle.radius = 3;
                circle.propertyFields.fill = 'color';

                let circle2 = imageSeries.mapImages.template.createChild(am4core.Circle);
                circle2.radius = 3;
                circle2.propertyFields.fill = 'color';


                circle2.events.on('inited', function (event) {
                    animateBullet(event.target);
                })


                function animateBullet(circle) {
                    let animation = circle.animate([{property: 'scale', from: 1, to: 3}, {
                        property: 'opacity',
                        from: 1,
                        to: 0
                    }], 1000, am4core.ease.circleOut);
                    animation.events.on('animationended', function (event) {
                        animateBullet(event.target.object);
                    })
                }

                let colorSet = new am4core.ColorSet();


                // let paris = addCity({'latitude': 48.8567, 'longitude': 2.3510}, 'Paris');
                // // let toronto = addCity({'latitude': 43.8163, 'longitude': -79.4287}, 'Toronto');
                // let la = addCity({'latitude': 34.3, 'longitude': -118.15}, 'Los Angeles');
                let cities = this.chart.series.push(new am4maps.MapImageSeries());
                cities.mapImages.template.nonScaling = true;
                let kiev = cities.mapImages.create();
                kiev.latitude = 50.4422;
                kiev.longitude = 30.5367;
                kiev.tooltipText = 'Kyiv';
                kiev.fill = color;

                let ankara = cities.mapImages.create();
                ankara.latitude = 39.9439;
                ankara.longitude = 32.8560;
                ankara.tooltipText = 'Ankara';
                ankara.fill = color;

                console.log(this.cities.length)
                console.log(this.limitService.getCitiesMap().size)
                this.cities.push(this.limitService.getCitiesMap().get('Ankara'))
                imageSeries.data = this.cities;

                // imageSeries.data = [{
                //     'title': 'Brussels',
                //     'latitude': 50.8371,
                //     'longitude': 4.3676,
                //     'color': colorSet.next()
                // }, {
                //     'title': 'Copenhagen',
                //     'latitude': 55.6763,
                //     'longitude': 12.5681,
                //     'color': color
                // }, {
                //     'title': 'Paris',
                //     'latitude': 48.8567,
                //     'longitude': 2.3510,
                //     'color': colorSet.next()
                // }, {
                //     'title': 'Reykjavik',
                //     'latitude': 64.1353,
                //     'longitude': -21.8952,
                //     'color': colorSet.next()
                // }, {
                //     'title': 'Moscow',
                //     'latitude': 55.7558,
                //     'longitude': 37.6176,
                //     'color': colorSet.next()
                // }, {
                //     'title': 'Madrid',
                //     'latitude': 40.4167,
                //     'longitude': -3.7033,
                //     'color': colorSet.next()
                // }, {
                //     'title': 'London',
                //     'latitude': 51.5002,
                //     'longitude': -0.1262,
                //     'url': 'http://www.google.co.uk',
                //     'color': colorSet.next()
                // }, {
                //     'title': 'Peking',
                //     'latitude': 39.9056,
                //     'longitude': 116.3958,
                //     'color': colorSet.next()
                // }, {
                //     'title': 'New Delhi',
                //     'latitude': 28.6353,
                //     'longitude': 77.2250,
                //     'color': colorSet.next()
                // }, {
                //     'title': 'Tokyo',
                //     'latitude': 35.6785,
                //     'longitude': 139.6823,
                //     'url': 'http://www.google.co.jp',
                //     'color': colorSet.next()
                // }, {
                //     'title': 'Buenos Aires',
                //     'latitude': -34.6118,
                //     'longitude': -58.4173,
                //     'color': colorSet.next()
                // }, {
                //     'title': 'Brasilia',
                //     'latitude': -15.7801,
                //     'longitude': -47.9292,
                //     'color': colorSet.next()
                // }, {
                //     'title': 'Ottawa',
                //     'latitude': 45.4235,
                //     'longitude': -75.6979,
                //     'color': colorSet.next()
                // }, {
                //     'title': 'Washington',
                //     'latitude': 38.8921,
                //     'longitude': -77.0241,
                //     'color': colorSet.next()
                // }, {
                //     'title': 'Kinshasa',
                //     'latitude': -4.3369,
                //     'longitude': 15.3271,
                //     'color': colorSet.next()
                // }, {
                //     'title': 'Cairo',
                //     'latitude': 30.0571,
                //     'longitude': 31.2272,
                //     'color': colorSet.next()
                // }, {
                //     'title': 'Pretoria',
                //     'latitude': -25.7463,
                //     'longitude': 28.1876,
                //     'color': colorSet.next()
                // }];

                imageSeries.data.push(kiev)
                imageSeries.data.push(ankara)

                let colorBlue = am4core.color('#02A8F3');
                // Add lines
                // let lineSeries = this.chart.series.push(new am4maps.MapArcSeries());
                let lineSeries = this.chart.series.push(new am4maps.MapLineSeries());
                lineSeries.dataFields.multiGeoLine = 'multiGeoLine';
                lineSeries.mapLines.template.line.fill = colorBlue;
                lineSeries.mapLines.template.line.strokeWidth = 5;
                lineSeries.mapLines.template.line.strokeOpacity = 0.1;
                // lineSeries.mapLines.template.arrow.nonScaling = true;
                // lineSeries.mapLines.template.arrow.width = 4;
                // lineSeries.mapLines.template.arrow.height = 6;
                // lineSeries.mapLines.template.arrow.fill = colorBlue;
                // lineSeries.mapLines.template.line.stroke = city.fill;
                lineSeries.mapLines.template.line.nonScalingStroke = true;
                // lineSeries.mapLines.template.line.strokeDasharray = '1,1';

                lineSeries.zIndex = 10;

                // let shadowLineSeries = this.chart.series.push(new am4maps.MapLineSeries());
                // shadowLineSeries.mapLines.template.line.strokeOpacity = 0;
                // shadowLineSeries.mapLines.template.line.nonScalingStroke = true;
                // shadowLineSeries.mapLines.template.shortestDistance = false;
                // shadowLineSeries.zIndex = 5;

                function addLine(from, to) {
                    let line = lineSeries.mapLines.create();
                    line.imagesToConnect = [from, to];
                    // line.line.controlPointDistance = -0.3;

                    // let shadowLine = shadowLineSeries.mapLines.create();
                    // shadowLine.imagesToConnect = [from, to];

                    return line;
                }

                addLine(kiev, ankara);


            });
        }
    }

    myFunction(ev, router: Router) {
        console.log('clicked on ', ev.target);
    }

    getCities = () =>
        this.limitService
            .getCities()
            .subscribe(res => {
                // res.forEach(function (value) {
                //     this.citiesMap.set(value.title, value);
                // })
                this.cities = res;
            })


    ngOnDestroy() {
        this.zone.runOutsideAngular(() => {
            if (this.chart) {
                this.chart.dispose();
            }
        });
    }

}
