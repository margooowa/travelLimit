import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {User} from './user.model';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user$: Observable<User>;
    user: User = new class implements User {
        displayName: string;
        email: string;
        myCustomData: string;
        photoURL: string;
        uid: string;
    };

    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router
    ) {
        this.user$ = this.afAuth.authState.pipe(
            switchMap(user => {
                // Logged in
                if (user) {
                    localStorage.setItem('email', user.email);
                    return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
                } else {
                    // Logged out
                    return of(null);
                }
            })
        )
    }


    async signOut() {
        await this.afAuth.signOut();
        this.user.email = null;
        localStorage.clear();
        this.router.navigate(['/']);
    }

    // Sign in with email/password
    SignIn(email, password) {
        return this.afAuth.signInWithEmailAndPassword(email, password)
            .then((result) => {
                console.log(email)
                this.user.email = email;
                this.router.navigate(['/user-profile/list']);
            }).catch((error) => {
                window.alert(error.message)
            })
    }

    getEmail() {
        return localStorage.getItem('email');
    }

}
