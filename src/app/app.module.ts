import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';


import {AppRoutingModule} from './app.routing';
import {ComponentsModule} from './components/components.module';

import {AppComponent} from './app.component';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {LimitService} from './dashboard/limit.service';
import {AngularMaterialModule} from './layouts/admin-layout/material.module';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        ComponentsModule,
        RouterModule,
        AppRoutingModule,
        AngularMaterialModule
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,

    ],
    providers: [LimitService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
