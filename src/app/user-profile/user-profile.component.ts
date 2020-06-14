import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
    form: FormGroup;
    public loginInvalid: boolean;
    private formSubmitAttempt: boolean;
    private returnUrl: string;

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private auth: AuthService
    ) {
    }

    async ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/game';

        this.form = this.fb.group({
            username: ['', Validators.email],
            password: ['', Validators.required]
        });

        // if (await this.authService.checkAuthenticated()) {
        //   await this.router.navigate([this.returnUrl]);
        // }
    }

    async onSubmit() {
        this.loginInvalid = false;
        this.formSubmitAttempt = false;
        if (this.form.valid) {
            try {
                const username = this.form.get('username').value;
                const password = this.form.get('password').value;
                await this.auth.SignIn(username, password);
            } catch (err) {
                this.loginInvalid = true;
            }
        } else {
            this.formSubmitAttempt = true;
        }
    }
}
