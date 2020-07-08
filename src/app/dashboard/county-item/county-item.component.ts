import {Component, Input, OnInit} from '@angular/core';
import {Limit} from '../limits.model';

@Component({
    selector: 'app-county-item',
    templateUrl: './county-item.component.html',
    styleUrls: ['./county-item.component.css']
})
export class CountyItemComponent implements OnInit {

    @Input() country: Limit;
    @Input() countyName: string;

    constructor() {
    }

    ngOnInit(): void {
    }

    saveEL() {

    }
}
