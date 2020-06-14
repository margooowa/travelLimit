import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';

import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    }, {
        path: '',
        component: AdminLayoutComponent,
        children: [{
            path: '',
            loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
        }]
    }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        MatAutocompleteModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        AngularFireAuthModule,
        RouterModule.forRoot(routes, {
            useHash: true
        }),
    ],
    exports: []
})
export class AppRoutingModule {
}
