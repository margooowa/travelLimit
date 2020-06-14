import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {User} from './user.model';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {auth} from 'firebase';
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
    ) {// Get the auth state, then fetch the Firestore user document or return null
        this.user$ = this.afAuth.authState.pipe(
            switchMap(user => {
                // Logged in
                if (user) {
                    return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
                } else {
                    // Logged out
                    return of(null);
                }
            })
        )
    }

    async googleSignin() {
        const provider = new auth.GoogleAuthProvider();
        const credential = await this.afAuth.signInWithPopup(provider);
        return this.updateUserData(credential.user);
    }

    private updateUserData(user) {
        // Sets user data to firestore on login
        const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

        const data = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
        }

        return userRef.set(data, {merge: true})

    }

    async signOut() {
        await this.afAuth.signOut();
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


}
