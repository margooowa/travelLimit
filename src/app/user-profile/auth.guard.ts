import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router,
    UrlTree
} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map, tap, take} from 'rxjs/operators';

import {AuthService} from './auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {
    }

    canActivate(next, state): Observable<boolean> {
        return this.authService.user$.pipe(
            take(1),
            map(user => !!user),
            tap(isAuth => {
                if (!isAuth) {
                    console.log('access denied')
                    this.router.navigate(['/user-profile']);
                }
            })
        );
    }
}
