import {Component, OnInit, ViewChild} from '@angular/core';
import {Limit} from '../../../dashboard/limits.model';
import {LimitService} from '../../../dashboard/limit.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
    selector: 'app-country-list',
    templateUrl: './country-list.component.html',
    styleUrls: ['./country-list.component.css']
})
export class CountryListComponent implements OnInit {

    dataSourceLimit: MatTableDataSource<Limit>;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    public limits: Limit[];
    displayedColumns: any[] = [
        '$id',
        'country',
        'continent',
        'action'
    ];

    ngOnInit() {
        this.getLimits();
    }

    constructor(private limitService: LimitService) {

        // /* Data table */
        // this.dataSource = new MatTableDataSource(this.limits);
        // /* Pagination */
        // setTimeout(() => {
        //     this.dataSource.paginator = this.paginator;
        // }, 0);
    }


    getLimits = () =>
        this.limitService
            .getLimits()
            .subscribe(res => {
                    this.limits = res;
                    /* Data table */
                    this.dataSourceLimit = new MatTableDataSource(this.limits);
                    /* Pagination */
                    setTimeout(() => {
                        this.dataSourceLimit.paginator = this.paginator;
                    }, 0);
                }
            )

    /* Delete */
    // deleteBook(index
    //                :
    //                number, e
    // ) {
    //     if (window.confirm('Are you sure?')) {
    //         const data = this.dataSourceLimit.data;
    //         data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
    //         this.dataSourceLimit.data = data;
    //         // this.limitService.DeleteBook(e.$key)
    //     }
    // }
}
