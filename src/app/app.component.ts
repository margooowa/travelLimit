import {Component} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {LimitService} from './dashboard/limit.service';
// declare ga as a function to set and sent the events
declare let gtag: Function;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})


export class AppComponent {

    constructor(public router: Router, public limitService: LimitService) {
        limitService.getCountiesSubscribe();
        this.router.events.subscribe(event => {
                if (event instanceof NavigationEnd) {
                    gtag('config', 'UA-168165866-1',
                        {
                            'page_path': event.urlAfterRedirects
                        }
                    );
                }
            }
        )
    }

}
