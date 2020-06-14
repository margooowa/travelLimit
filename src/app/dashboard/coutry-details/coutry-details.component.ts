import {Component, OnInit} from '@angular/core';
import {Limit} from '../limits.model';
import {LimitService} from '../limit.service';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
    selector: 'app-coutry-details',
    templateUrl: './coutry-details.component.html',
    styleUrls: ['./coutry-details.component.css']
})
export class CoutryDetailsComponent implements OnInit {
    country: Limit;
    countyName: string;

    constructor(private limitService: LimitService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params
            .subscribe(
                (params: Params) => {
                    this.countyName = params.countryName;
                    this.getLimitsByCountryName(this.countyName)
                    // this.country = this.getLimitsByCountryName(this.countyName);
                }
            );
    }

    getLimitsByCountryName = (countyName: string) =>
        this.limitService
            .getLimitsByCountryName(countyName)
            .subscribe(res => (this.country = res[0]))

}
