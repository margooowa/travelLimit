import {Injectable} from '@angular/core';

import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Limit} from './limits.model';
import {Observable} from 'rxjs';
import {AuthService} from '../user-profile/auth.service';

@Injectable()
export class LimitService {
    // recipesChanged = new Subject<Recipe[]>();
    //
    private countries: Limit[] = [];

    constructor(private firestore: AngularFirestore,
                private authService: AuthService
    ) {
    }


    setCountries(countries: Limit[]) {
        this.countries = countries;
    }

    create_Limit(record) {
        return this.firestore.collection('Students').add(record);
    }


    updateLimit(recordID, record) {
        this.firestore.collection('limits').doc(recordID).update(record);
    }

    addLimit(record: Limit) {
        record.time = new Date().toString();
        record.userId = this.authService.user.email;
        this.firestore.collection('limits').add(record);
    }

    delete_Student(record_id) {
        this.firestore.doc('Students/' + record_id).delete();
    }


    getLimits() {
        return this.firestore.collection('limits').snapshotChanges()
            .pipe(map(actions => actions.map(this.documentToDomainObject)
                // , tap(countries => {
                // this.setCountries(countries);})
            ));
    }

    getLimitsContinent(continent: string) {
        return this.firestore.collection('limits', ref => ref.where('continent',
            '==', continent)).snapshotChanges()
            .pipe(map(actions => actions.map(this.documentToDomainObject)));
    }

    getLimitsById(id: string) {
        // return Observable.create(subscriber ->
        //     firestore.collection(limits).document(uid)
        //         .get().addOnSuccessListener(documentSnapshot -> {
        //         subscriber.onNext(documentSnapshot.toObject(User.class));
        //     })
        //         .addOnFailureListener(subscriber::onError));
        // return this.firestore.collection('limits', ref => ref.where(this.firestore.firestore.documentId(), '==', 'fK3ddutEpD2qQqRMXNW5')).snapshotChanges()
        //     .pipe(map(actions => actions.map(this.documentToDomainObject)));
        // console.log('id!! ', id)
        const doc = this.firestore.collection('limits').doc('Ex689itaSOgxDzTiJzWN').snapshotChanges()
            .pipe(map(this.documentToDomainObject));
        console.log('doc!! ', doc)
        //  const documentToDomainObject1 = this.documentToDomainObject(doc);
        // console.log('documentToDomainObject1 ', documentToDomainObject1)
        return doc
    }

    getLimitsByCountryName(countryName: string) {
        return this.firestore.collection('limits', ref => ref.where('country',
            '==', countryName)).snapshotChanges()
            .pipe(map(actions => actions.map(this.documentToDomainObject)));
    }

    documentToDomainObject = _ => {
        const object = _.payload.doc.data();
        console.log('!object')
        object.$id = _.payload.doc.id;
        return object;
    }
}
