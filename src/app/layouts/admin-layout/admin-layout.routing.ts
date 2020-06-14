import {Routes} from '@angular/router';

import {DashboardComponent} from '../../dashboard/dashboard.component';
import {UserProfileComponent} from '../../user-profile/user-profile.component';
import {TableListComponent} from '../../table-list/table-list.component';
import {TypographyComponent} from '../../typography/typography.component';
import {IconsComponent} from '../../icons/icons.component';
import {NotificationsComponent} from '../../notifications/notifications.component';
import {UpgradeComponent} from '../../upgrade/upgrade.component';
import {CoutryDetailsComponent} from '../../dashboard/coutry-details/coutry-details.component';
import {SecretComponent} from '../../user-profile/secret/secret.component';
import {CountryListComponent} from '../../user-profile/crud/country-list/country-list.component';
import {AddCountryComponent} from '../../user-profile/crud/add-country/add-country.component';
import {UpdateCountryComponent} from '../../user-profile/crud/update-country/update-country.component';

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
    {path: 'dashboard/continent/:continent', component: DashboardComponent},
    {path: 'user-profile', component: UserProfileComponent},
    // {path: 'user-profile/secret', component: SecretComponent, canActivate : [AuthGuard]},
    {path: 'user-profile/secret', component: SecretComponent},
    {path: 'user-profile/list', component: CountryListComponent},
    {path: 'user-profile/update/:country', component: UpdateCountryComponent},
    {path: 'user-profile/new', component: AddCountryComponent},

    {path: 'table-list', component: TableListComponent},
    {path: 'typography', component: TypographyComponent},
    {path: 'icons', component: IconsComponent},
    {path: 'notifications', component: NotificationsComponent},
    {path: 'upgrade', component: UpgradeComponent},
];
