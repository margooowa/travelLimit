import {AfterViewInit, Component, ElementRef, Input, NgZone, OnDestroy, OnInit, ViewChild} from '@angular/core';
/* Imports */
import * as am4core from '@amcharts/amcharts4/core';
import * as am4maps from '@amcharts/amcharts4/maps';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4geodata_worldLow from '@amcharts/amcharts4-geodata/worldLow';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {Limit} from '../limits.model';

/* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);

// Themes end

@Component({
    selector: 'app-mapchart',
    templateUrl: './mapchart.component.html',
    styleUrls: ['./mapchart.component.css']
})
export class MapchartComponent implements AfterViewInit, OnDestroy {

    @ViewChild('chartdiv', {static: true})
    private chartDom: ElementRef;

    @Input() limitsMap: Limit[];


    @Input()
    set limits(limits: Limit[]) {
        this.limitsMap = limits;
    }

    get limits(): Limit[] {
        return this.limitsMap
    }

    constructor(private zone: NgZone, private router: Router, public dialog: MatDialog) {
    }

    private chart: am4maps.MapChart;

//     ngAfterViewInit() {
//         // this.router.navigate(['/user-profile']);
//         this.zone.runOutsideAngular(() => {
//
//             // Create map instance
//             this.chart = am4core.create(this.chartDom.nativeElement, am4maps.MapChart);
//
// // Set map definition
//             this.chart.geodata = am4geodata_worldLow;
//
// // Set projection
//             this.chart.projection = new am4maps.projections.Miller();
//
// // Create map polygon series
//             let polygonSeries = this.chart.series.push(new am4maps.MapPolygonSeries());
//
// // Exclude Antartica
//             polygonSeries.exclude = ['AQ'];
//
// // Make map load polygon (like country names) data from GeoJSON
//             polygonSeries.useGeodata = true;
//
// // Configure series
//             let polygonTemplate = polygonSeries.mapPolygons.template;
//
//             polygonTemplate.events.on('hit', function (ev) {
//                 // get object info
//                 console.log(ev.target.dataItem.dataContext);
//                 console.log(this.limits)
//                 const dialogRef =  this.dialog.open(DialogCountryComponent);
//
//                 dialogRef.afterClosed().subscribe(result => {
//                     console.log(`Dialog result: ${result}`);
//                 });
//                 // this.router.navigate(['/dashboard/%D0%98%D0%BD%D0%B4%D0%B8%D1%8F']);
//             }, this);
//             polygonTemplate.tooltipText = '{name}';
//             polygonTemplate.polygon.fillOpacity = 0.6;
//
//
// // Create hover state and set alternative fill color
//             let hs = polygonTemplate.states.create('hover');
//             hs.properties.fill = this.chart.colors.getIndex(0);
//
// // Add image series
//             let imageSeries = this.chart.series.push(new am4maps.MapImageSeries());
//             imageSeries.mapImages.template.propertyFields.longitude = 'longitude';
//             imageSeries.mapImages.template.propertyFields.latitude = 'latitude';
//             imageSeries.mapImages.template.tooltipText = '{title}';
//             imageSeries.mapImages.template.propertyFields.url = 'url';
//
//             let circle = imageSeries.mapImages.template.createChild(am4core.Circle);
//             circle.radius = 3;
//             circle.propertyFields.fill = 'color';
//
//             let circle2 = imageSeries.mapImages.template.createChild(am4core.Circle);
//             circle2.radius = 3;
//             circle2.propertyFields.fill = 'color';
//
//
//             circle2.events.on('inited', function (event) {
//                 animateBullet(event.target);
//             })
//
//
//             function animateBullet(circle) {
//                 let animation = circle.animate([{property: 'scale', from: 1, to: 5}, {
//                     property: 'opacity',
//                     from: 1,
//                     to: 0
//                 }], 1000, am4core.ease.circleOut);
//                 animation.events.on('animationended', function (event) {
//                     animateBullet(event.target.object);
//                 })
//             }
//
//             let colorSet = new am4core.ColorSet();
//
//             imageSeries.data = [{
//                 'title': 'Brussels',
//                 'latitude': 50.8371,
//                 'longitude': 4.3676,
//                 'color': colorSet.next()
//             }, {
//                 'title': 'Copenhagen',
//                 'latitude': 55.6763,
//                 'longitude': 12.5681,
//                 'color': colorSet.next()
//             }, {
//                 'title': 'Paris',
//                 'latitude': 48.8567,
//                 'longitude': 2.3510,
//                 'color': colorSet.next()
//             }, {
//                 'title': 'Reykjavik',
//                 'latitude': 64.1353,
//                 'longitude': -21.8952,
//                 'color': colorSet.next()
//             }, {
//                 'title': 'Moscow',
//                 'latitude': 55.7558,
//                 'longitude': 37.6176,
//                 'color': colorSet.next()
//             }, {
//                 'title': 'Madrid',
//                 'latitude': 40.4167,
//                 'longitude': -3.7033,
//                 'color': colorSet.next()
//             }, {
//                 'title': 'London',
//                 'latitude': 51.5002,
//                 'longitude': -0.1262,
//                 'url': 'http://www.google.co.uk',
//                 'color': colorSet.next()
//             }, {
//                 'title': 'Peking',
//                 'latitude': 39.9056,
//                 'longitude': 116.3958,
//                 'color': colorSet.next()
//             }, {
//                 'title': 'New Delhi',
//                 'latitude': 28.6353,
//                 'longitude': 77.2250,
//                 'color': colorSet.next()
//             }, {
//                 'title': 'Tokyo',
//                 'latitude': 35.6785,
//                 'longitude': 139.6823,
//                 'url': 'http://www.google.co.jp',
//                 'color': colorSet.next()
//             }, {
//                 'title': 'Ankara',
//                 'latitude': 39.9439,
//                 'longitude': 32.8560,
//                 'color': colorSet.next()
//             }, {
//                 'title': 'Buenos Aires',
//                 'latitude': -34.6118,
//                 'longitude': -58.4173,
//                 'color': colorSet.next()
//             }, {
//                 'title': 'Brasilia',
//                 'latitude': -15.7801,
//                 'longitude': -47.9292,
//                 'color': colorSet.next()
//             }, {
//                 'title': 'Ottawa',
//                 'latitude': 45.4235,
//                 'longitude': -75.6979,
//                 'color': colorSet.next()
//             }, {
//                 'title': 'Washington',
//                 'latitude': 38.8921,
//                 'longitude': -77.0241,
//                 'color': colorSet.next()
//             }, {
//                 'title': 'Kinshasa',
//                 'latitude': -4.3369,
//                 'longitude': 15.3271,
//                 'color': colorSet.next()
//             }, {
//                 'title': 'Cairo',
//                 'latitude': 30.0571,
//                 'longitude': 31.2272,
//                 'color': colorSet.next()
//             }, {
//                 'title': 'Pretoria',
//                 'latitude': -25.7463,
//                 'longitude': 28.1876,
//                 'color': colorSet.next()
//             }];
//
//
//         });
//     }


    ngAfterViewInit() {
        /* Chart code */
// Themes begin
        am4core.useTheme(am4themes_animated);
// Themes end

// Create map instance
        this.chart = am4core.create(this.chartDom.nativeElement, am4maps.MapChart);
        this.chart.geodata = am4geodata_worldLow;
        this.chart.projection = new am4maps.projections.Miller();
        this.chart.homeZoomLevel = 2.5;
        this.chart.homeGeoPoint = {
            latitude: 38,
            longitude: -60
        };

// Create map polygon series
        let polygonSeries = this.chart.series.push(new am4maps.MapPolygonSeries());
        polygonSeries.useGeodata = true;
        polygonSeries.mapPolygons.template.fill = this.chart.colors.getIndex(0).lighten(0.5);
        polygonSeries.mapPolygons.template.nonScalingStroke = true;
        polygonSeries.exclude = ['AQ'];

// Add line bullets
        let cities = this.chart.series.push(new am4maps.MapImageSeries());
        cities.mapImages.template.nonScaling = true;

        let city = cities.mapImages.template.createChild(am4core.Circle);
        city.radius = 6;
        city.fill = this.chart.colors.getIndex(0).brighten(-0.2);
        city.strokeWidth = 2;
        city.stroke = am4core.color('#fff');

        function addCity(coords, title) {
            let city = cities.mapImages.create();
            city.latitude = coords.latitude;
            city.longitude = coords.longitude;
            city.tooltipText = title;
            return city;
        }

        let paris = addCity({'latitude': 48.8567, 'longitude': 2.3510}, 'Paris');
        // let toronto = addCity({'latitude': 43.8163, 'longitude': -79.4287}, 'Toronto');
        let la = addCity({'latitude': 34.3, 'longitude': -118.15}, 'Los Angeles');
        // let havana = addCity({'latitude': 23, 'longitude': -82}, 'Havana');

// Add lines
        let lineSeries = this.chart.series.push(new am4maps.MapArcSeries());
        lineSeries.mapLines.template.line.strokeWidth = 2;
        lineSeries.mapLines.template.line.strokeOpacity = 0.5;
        lineSeries.mapLines.template.line.stroke = city.fill;
        lineSeries.mapLines.template.line.nonScalingStroke = true;
        lineSeries.mapLines.template.line.strokeDasharray = '1,1';
        lineSeries.zIndex = 10;

        let shadowLineSeries = this.chart.series.push(new am4maps.MapLineSeries());
        shadowLineSeries.mapLines.template.line.strokeOpacity = 0;
        shadowLineSeries.mapLines.template.line.nonScalingStroke = true;
        shadowLineSeries.mapLines.template.shortestDistance = false;
        shadowLineSeries.zIndex = 5;

        function addLine(from, to) {
            let line = lineSeries.mapLines.create();
            line.imagesToConnect = [from, to];
            line.line.controlPointDistance = -0.3;

            let shadowLine = shadowLineSeries.mapLines.create();
            shadowLine.imagesToConnect = [from, to];

            return line;
        }

        addLine(paris, la);
        // addLine(paris, toronto);
        // addLine(toronto, la);
        // addLine(la, havana);

// Add plane
        let plane = lineSeries.mapLines.getIndex(0).lineObjects.create();
        plane.position = 0;
        plane.width = 48;
        plane.height = 48;

        plane.adapter.add('scale', function (scale, target) {
            return 0.5 * (1 - (Math.abs(0.5 - target.position)));
        })

        let planeImage = plane.createChild(am4core.Sprite);
        planeImage.scale = 0.08;
        planeImage.horizontalCenter = 'middle';
        planeImage.verticalCenter = 'middle';
        planeImage.path = 'm2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47';
        planeImage.fill = this.chart.colors.getIndex(2).brighten(-0.2);
        planeImage.strokeOpacity = 0;

        let shadowPlane = shadowLineSeries.mapLines.getIndex(0).lineObjects.create();
        shadowPlane.position = 0;
        shadowPlane.width = 48;
        shadowPlane.height = 48;

        let shadowPlaneImage = shadowPlane.createChild(am4core.Sprite);
        shadowPlaneImage.scale = 0.05;
        shadowPlaneImage.horizontalCenter = 'middle';
        shadowPlaneImage.verticalCenter = 'middle';
        shadowPlaneImage.path = 'm2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47';
        shadowPlaneImage.fill = am4core.color('#000');
        shadowPlaneImage.strokeOpacity = 0;

        shadowPlane.adapter.add('scale', function (scale, target) {
            target.opacity = (0.6 - (Math.abs(0.5 - target.position)));
            return 0.5 - 0.3 * (1 - (Math.abs(0.5 - target.position)));
        })

// Plane animation
        let currentLine = 0;
        let direction = 1;

        function flyPlane() {

            // Get current line to attach plane to
            plane.mapLine = lineSeries.mapLines.getIndex(currentLine);
            plane.parent = lineSeries;
            shadowPlane.mapLine = shadowLineSeries.mapLines.getIndex(currentLine);
            shadowPlane.parent = shadowLineSeries;
            shadowPlaneImage.rotation = planeImage.rotation;

            // Set up animation
            let from, to;
            let numLines = lineSeries.mapLines.length;
            if (direction == 1) {
                from = 0
                to = 1;
                if (planeImage.rotation != 0) {
                    planeImage.animate({to: 0, property: 'rotation'}, 1000).events.on('animationended', flyPlane);
                    return;
                }
            }
            else {
                from = 1;
                to = 0;
                if (planeImage.rotation != 180) {
                    planeImage.animate({to: 180, property: 'rotation'}, 1000).events.on('animationended', flyPlane);
                    return;
                }
            }

            // Start the animation
            let animation = plane.animate({
                from: from,
                to: to,
                property: 'position'
            }, 5000, am4core.ease.sinInOut);
            animation.events.on('animationended', flyPlane)
            /*animation.events.on("animationprogress", function(ev) {
              let progress = Math.abs(ev.progress - 0.5);
              //console.log(progress);
              //planeImage.scale += 0.2;
            });*/

            shadowPlane.animate({
                from: from,
                to: to,
                property: 'position'
            }, 5000, am4core.ease.sinInOut);

            // Increment line, or reverse the direction
            currentLine += direction;
            if (currentLine < 0) {
                currentLine = 0;
                direction = 1;
            } else if ((currentLine + 1) > numLines) {
                currentLine = numLines - 1;
                direction = -1;
            }

        }

// Go!
        flyPlane();

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

@Component({
    selector: 'app-dialog-country',
    templateUrl: 'dialog-country.html',
})
export class DialogCountryComponent {
}
