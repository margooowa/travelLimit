import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminLayoutRoutes} from './admin-layout.routing';
import {DashboardComponent} from '../../dashboard/dashboard.component';
import {UserProfileComponent} from '../../user-profile/user-profile.component';
import {TypographyComponent} from '../../typography/typography.component';
import {NotificationsComponent} from '../../notifications/notifications.component';
import {UpgradeComponent} from '../../upgrade/upgrade.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {CoutryDetailsComponent} from '../../dashboard/coutry-details/coutry-details.component';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatBadgeModule} from '@angular/material/badge';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatChipsModule} from '@angular/material/chips';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDividerModule} from '@angular/material/divider';
import {CountryListComponent} from 'app/user-profile/crud/country-list/country-list.component';
import {AddCountryComponent} from '../../user-profile/crud/add-country/add-country.component';
import {CountyItemComponent} from '../../dashboard/county-item/county-item.component';
import {UpdateCountryComponent} from 'app/user-profile/crud/update-country/update-country.component';
import {EditorModule} from '@tinymce/tinymce-angular';
import {MatCardModule} from '@angular/material/card';
import {DialogCountryComponent, MapchartComponent} from '../../dashboard/mapchart/mapchart.component';
import {MapCountryDetailsComponent} from '../../dashboard/coutry-details/map-country-details/map-country-details.component';

// @ts-ignore
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatSelectModule,
        MatTooltipModule,
        MatTableModule,
        MatPaginatorModule,
        MatDividerModule,
        MatAutocompleteModule,
        EditorModule,
        // AngularMaterialModule,

        CommonModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatBadgeModule,
        MatListModule,
        MatGridListModule,
        MatInputModule,
        MatSelectModule,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatChipsModule,
        MatTooltipModule,
        MatTableModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatRippleModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        MatAutocompleteModule
    ],
    declarations: [
        DashboardComponent,
        CoutryDetailsComponent,
        CountyItemComponent,
        AddCountryComponent,
        MapchartComponent,
        MapCountryDetailsComponent,
        DialogCountryComponent,
        CountryListComponent,
        UpdateCountryComponent,
        UserProfileComponent,
        TypographyComponent,
        NotificationsComponent,
        UpgradeComponent,
    ]
})

export class AdminLayoutModule {
}
