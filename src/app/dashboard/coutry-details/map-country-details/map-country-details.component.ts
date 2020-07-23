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
import {LimitService} from '../../limit.service';
import {CityValues} from 'app/dashboard/cityValues.model';
import {CountriesValues} from '../../countriesValues.model';

@Component({
    selector: 'app-map-country-details',
    templateUrl: './map-country-details.component.html',
    styleUrls: ['./map-country-details.component.css']
})
export class MapCountryDetailsComponent implements OnInit, AfterViewInit, OnDestroy {


    @ViewChild('chartdiv')
    private chartDom: ElementRef;

    @Input() countryMap: Limit;
    public selectedCities: CityValues[] = [];
    public selectedCountries: CountriesValues[] = [];
    private countriesMapAll: Map<string, CountriesValues> = new Map<string, CountriesValues>();


    @Input()
    set country(country: Limit) {
        this.countryMap = country;
    }

    get country(): Limit {
        return this.countryMap
    }

    isShow() {
        // if (!this.countryMap) {
        //     return false;
        // } else
        if (this.countryMap.country === 'Украина') {
            return true;
        }
        return false;
    };


    constructor(private zone: NgZone, private router: Router, public dialog: MatDialog, private limitService: LimitService) {
    }

    private chart: am4maps.MapChart;


    ngOnInit(): void {
        this.countriesMapAll = this.limitService.getCountiesMap()
    }


    ngAfterViewInit() {
        if (this.countryMap.country === 'Украина') {
            am4core.useTheme(am4themes_animated);
            this.zone.runOutsideAngular(() => {

                // Create map instance
                this.chart = am4core.create(this.chartDom.nativeElement, am4maps.MapChart);
                this.chart.language.locale = am4lang_ru_RU;
                this.chart.geodataNames = am4geodata_lang_RU;

                this.chart.logo.height = -15;

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
                //     // const dialogRef = this.dialog.open(DialogCountryComponent);
                //     //
                //     // dialogRef.afterClosed().subscribe(result => {
                //     //     console.log(`Dialog result: ${result}`);
                //     // });
                //     // this.router.navigate(['/dashboard/%D0%98%D0%BD%D0%B4%D0%B8%D1%8F']);
                // }, this);
                polygonTemplate.tooltipText = '{name}';
                polygonTemplate.polygon.fillOpacity = 0.6;

                for (var countryloop of this.country.allowedCountries) {
                    console.log(countryloop)
                    const countriesValues = this.countriesMapAll.get(countryloop);
                    this.selectedCountries.push(countriesValues);
                    this.selectedCities.push(countriesValues.capital);
                    // this.dataColor.push(countriesValues);
                }

                const currentCountryLocation = this.countriesMapAll.get(this.country.country);
                const currentCapitalLocation = currentCountryLocation.capital
                this.selectedCountries.push(currentCountryLocation);

                let color = am4core.color('#7cb342');
                polygonSeries.data = this.selectedCountries;

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

                imageSeries.mapImages.template.nonScaling = true;

                let circle = imageSeries.mapImages.template.createChild(am4core.Circle);

                circle.radius = 3;
                // circle.nonScaling = true;
                circle.propertyFields.fill = 'color';

                let circle2 = imageSeries.mapImages.template.createChild(am4core.Circle);
                circle2.radius = 3;
                // circle.nonScaling = true;
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

                let cities = this.chart.series.push(new am4maps.MapImageSeries());
                // cities.mapImages.template.nonScaling = true;


                imageSeries.data = this.selectedCities;
                imageSeries.data.push(currentCapitalLocation)


                let colorBlue = am4core.color('#02A8F3');

                // Add lines
                let lineSeries = this.chart.series.push(new am4maps.MapLineSeries());
                lineSeries.dataFields.multiGeoLine = 'multiGeoLine';

                let lineTemplate = lineSeries.mapLines.template;
                lineTemplate.nonScalingStroke = true;
                lineTemplate.arrow.nonScaling = true;
                lineTemplate.arrow.width = 4;
                lineTemplate.arrow.height = 6;
                // lineTemplate.stroke = interfaceColors.getFor("alternativeBackground");
                // lineTemplate.fill = interfaceColors.getFor("alternativeBackground");
                lineTemplate.line.strokeOpacity = 0.4;

                function addLine(from, to) {
                    let line = lineSeries.mapLines.create();
                    line.imagesToConnect = [from, to];
                    // line.line.controlPointDistance = -0.3;

                    // let shadowLine = shadowLineSeries.mapLines.create();
                    // shadowLine.imagesToConnect = [from, to];

                    return line;
                }

                const currentCapitalImage = cities.mapImages.create();
                currentCapitalImage.latitude = currentCapitalLocation.latitude;
                currentCapitalImage.longitude = currentCapitalLocation.longitude;
                currentCapitalImage.tooltipText = currentCapitalLocation.title;
                currentCapitalImage.fill = currentCapitalLocation.color;


                for (var cityValue of this.selectedCities) {
                    let curr = cities.mapImages.create();
                    curr.latitude = cityValue.latitude;
                    curr.longitude = cityValue.longitude;
                    curr.tooltipText = cityValue.title;
                    curr.fill = cityValue.color;
                    // console.log(currentCapitalImage, curr)
                    addLine(currentCapitalImage, curr);
                }

                // console.log(kiev, ankara)
                // addLine(kiev, ankara);


            });
        }
    }

    myFunction(ev, router: Router) {
        console.log('clicked on ', ev.target);
    }


    ngOnDestroy() {
        this.zone.runOutsideAngular(() => {
            if (this.chart) {
                this.chart.dispose();
            }
        });
    }

}
