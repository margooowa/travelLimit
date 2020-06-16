import {Routes} from '@angular/router';

import {DashboardComponent} from '../../dashboard/dashboard.component';
import {UserProfileComponent} from '../../user-profile/user-profile.component';
import {TypographyComponent} from '../../typography/typography.component';
import {NotificationsComponent} from '../../notifications/notifications.component';
import {UpgradeComponent} from '../../upgrade/upgrade.component';
import {CoutryDetailsComponent} from '../../dashboard/coutry-details/coutry-details.component';
import {CountryListComponent} from '../../user-profile/crud/country-list/country-list.component';
import {AddCountryComponent} from '../../user-profile/crud/add-country/add-country.component';
import {UpdateCountryComponent} from '../../user-profile/crud/update-country/update-country.component';
import {AuthGuard} from '../../user-profile/auth.guard';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }

    // {
    //     path: 'dashboard', component: DashboardComponent, children: [
    //         {
    //             path: ':countryName',
    //             component: CoutryDetailsComponent
    //         }]
    // },

    {path: 'dashboard', component: DashboardComponent},
    {path: 'dashboard/:countryName', component: CoutryDetailsComponent},
    {path: 'dashboard/continent/:continent/:countryName', component: CoutryDetailsComponent},
    {path: 'dashboard/continent/:continent', component: DashboardComponent},
    {
        path: 'user-profile', component: UserProfileComponent,
        children: [{
            path: 'list',
            component: CountryListComponent,
            canActivate: [AuthGuard]
        }, {
            path: 'update/:country',
            component: UpdateCountryComponent,
            canActivate: [AuthGuard]
        }, {
            path: 'new',
            component: AddCountryComponent,
            canActivate: [AuthGuard]
        }],

    },

    {path: 'typography', component: TypographyComponent},
    {path: 'notifications', component: NotificationsComponent},
    {path: 'upgrade', component: UpgradeComponent},
];
