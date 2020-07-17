import {Injectable} from '@angular/core';

import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Limit} from './limits.model';
import {AuthService} from '../user-profile/auth.service';
import {firestore} from 'firebase';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {CityValues} from './cityValues.model';
import * as am4core from '@amcharts/amcharts4/core';
import {CountriesValues} from './countriesValues.model';

@Injectable()
export class LimitService {

    private colorSet = new am4core.ColorSet();
    private citiesMap: Map<string, CityValues> = new Map<string, CityValues>();
    private countriesMap: Map<string, CountriesValues> = new Map<string, CountriesValues>();

    constructor(private firestoreSer: AngularFirestore,
                private authService: AuthService,
                private http: HttpClient
    ) {
    }


    updateLimit(recordID, record: Limit) {
        record.time = firestore.Timestamp.now();
        record.userId = this.authService.getEmail();
        this.firestoreSer.collection('limits').doc(recordID).update(record);
    }

    addLimit(record: Limit) {
        record.time = firestore.Timestamp.now();
        record.userId = this.authService.getEmail();
        this.firestoreSer.collection('limits').add(record);
    }


    getLimits() {
        return this.firestoreSer.collection('limits', ref => ref.orderBy('time', 'desc')).snapshotChanges()
            .pipe(map(actions => actions.map(this.documentToDomainObject)
                // , tap(countries => {
                // this.setCountries(countries);})
            ));
    }

    getLimitsContinent(continent: string) {
        return this.firestoreSer.collection('limits', ref => ref.where('continent',
            '==', continent).orderBy('time', 'desc')).snapshotChanges()
            .pipe(map(actions => actions.map(this.documentToDomainObject)));
    }

    // getLimitsById(id: string) {
    //     // return Observable.create(subscriber ->
    //     //     firestore.collection(limits).document(uid)
    //     //         .get().addOnSuccessListener(documentSnapshot -> {
    //     //         subscriber.onNext(documentSnapshot.toObject(User.class));
    //     //     })
    //     //         .addOnFailureListener(subscriber::onError));
    //     // return this.firestore.collection('limits', ref => ref.where(this.firestore.firestore.documentId(), '==', 'fK3ddutEpD2qQqRMXNW5')).snapshotChanges()
    //     //     .pipe(map(actions => actions.map(this.documentToDomainObject)));
    //     // console.log('id!! ', id)
    //     const doc = this.firestore.collection('limits').doc('Ex689itaSOgxDzTiJzWN').snapshotChanges()
    //         .pipe(map(this.documentToDomainObject));
    //     return doc
    // }

    getLimitsByCountryName(countryName: string) {
        return this.firestoreSer.collection('limits', ref => ref.where('country',
            '==', countryName)).snapshotChanges()
            .pipe(map(actions => actions.map(this.documentToDomainObject)));
    }


    // getCities(): Observable<CityValues[]> {
    //     return this.http.get('./app/dashboard/cities.json')
    //         .pipe(map(city => {
    //             let object:CityValues = city;
    //             return object
    //         }));
    // }


    getCities(): Observable<CityValues[]> {
        return this.http.get<CityValues[]>('./assets/cities.json')
            .pipe(map(actions => actions.map(this.toCity)));
    }

    getCitiesMap(): Map<string, CityValues> {
        if (Object.keys(this.citiesMap).length === 0 && this.citiesMap.constructor === Object) {
            this.http.get<CityValues[]>('./assets/cities.json')
                .pipe(map(actions => actions.map(this.toCity)))
        }
        return this.citiesMap;
    }

    getCounties(): Observable<CountriesValues[]> {
        return this.http.get<CityValues[]>('./assets/countries.json')
            .pipe(map(actions => actions.map(this.toCountryMap)))
    }

    getCountiesMap(): Map<string, CountriesValues> {
        if (Object.keys(this.citiesMap).length === 0 && this.citiesMap.constructor === Object) {
            this.http.get<CityValues[]>('./assets/countries.json')
                .pipe(map(actions => actions.map(this.toCountryMap)))
        }
        return this.countriesMap;
    }


    toCity = _ => {
        const object = _;
        object.color = this.colorSet.next();
        this.citiesMap.set(object.title, object);
        return object;
    }

    toCountryMap = _ => {
        const object: CountriesValues = _;
        object.fill = this.colorSet.next();
        this.countriesMap.set(object.name, object);
        return object;
    }


    documentToDomainObject = _ => {
        const object = _.payload.doc.data();
        object.$id = _.payload.doc.id;
        object.timeUi = object.time.toDate()
        return object;
    }
}
