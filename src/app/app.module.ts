import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';


import {AppRoutingModule} from './app.routing';
import {ComponentsModule} from './components/components.module';

import {AppComponent} from './app.component';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {LimitService} from './dashboard/limit.service';
import {AngularMaterialModule} from './layouts/admin-layout/material.module';
import {AboutUsComponent} from './about-us/about-us.component';
import {HttpClientModule} from '@angular/common/http';
import { MapchartComponent } from './dashboard/mapchart/mapchart.component';
import { CoronaMapComponent } from './dashboard/corona-map/corona-map.component';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,

        HttpClientModule,
        ComponentsModule,
        RouterModule,
        AppRoutingModule,
        AngularMaterialModule
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        AboutUsComponent,
        CoronaMapComponent

    ],
    providers: [LimitService],
    bootstrap: [AppComponent]
})
export class AppModule {

}
