import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LimitService} from '../dashboard/limit.service';
import {Router} from '@angular/router';
import {EmailService} from './email.service';

@Component({
    selector: 'app-about-us',
    templateUrl: './about-us.component.html',
    styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {

    aboutUsForm: FormGroup;
    email: string;
    msg: string
    name: string
    @ViewChild('resetBookForm') myNgForm;

    constructor(public fb: FormBuilder,
                private router: Router,
                private emailService: EmailService) {

    }

    ngOnInit(): void {
        this.submitFeedbackForm();
    }

    /* Reactive book form */
    submitFeedbackForm() {
        this.aboutUsForm = this.fb.group({
            email: ['', [Validators.required]],
            name: ['', [Validators.required]],
            msg: ['', [Validators.required]]
        })
    }

    submitFeedback() {
        if (this.aboutUsForm.valid) {
            this.emailService.postData(this.aboutUsForm.value.name, this.aboutUsForm.value.email, this.aboutUsForm.value.msg)
                .subscribe(
                    error => console.log(error)
                );
            this.resetForm();
            // this.router.navigate(['/user-profile/list']);
        }
    }

    /* Reset form */
    resetForm() {
        this.aboutUsForm.reset();
        Object.keys(this.aboutUsForm.controls).forEach(key => {
            this.aboutUsForm.controls[key].setErrors(null)
        });
    }

}
