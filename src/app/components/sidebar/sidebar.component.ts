import {Component, OnInit} from '@angular/core';

declare const $: any;

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    {path: '/dashboard', title: 'Все страны', icon: 'language', class: ''},
    {path: '/dashboard/continent/Europe', title: 'Европa', icon: 'flight', class: ''},
    {path: '/dashboard/continent/Asia', title: 'Азия', icon: 'flight', class: ''},
    {path: '/dashboard/continent/NorthAmerica', title: 'Северная Америка', icon: 'flight', class: ''},
    {path: '/dashboard/continent/SouthAmerica', title: 'Южная Америка', icon: 'flight', class: ''},
    {path: '/dashboard/continent/Africa', title: 'Африка', icon: 'flight', class: ''},
    {path: '/dashboard/continent/Australia', title: 'Австралия', icon: 'flight', class: ''},
    // {path: '/user-profile', title: 'User Profile', icon: 'person', class: ''},
    // {path: '/typography', title: 'Typography', icon: 'library_books', class: ''},
    // {path: '/notifications', title: 'Notifications', icon: 'notifications', class: ''},
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    menuItems: any[];

    constructor() {
    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    isMobileMenu() {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    };
}
