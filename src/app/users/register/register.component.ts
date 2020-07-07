import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from '../../models/user';
import { AuthService } from '../../core/services/auth.service';
export interface DialogData {
    animal: string;
    name: string;
}
@Component({
    selector: 'register.component',
    templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
    title = 'Welcome register Component';
    registerForm: FormGroup;
    user: User;
    validatonMsg:string;

    constructor(
        public dialogRef: MatDialogRef<RegisterComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        public dialog: MatDialog, private fb: FormBuilder,
        private authService: AuthService) { }

    ngOnInit() {
        this.buildForm();
    }
    buildForm() {
        this.registerForm = this.fb.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')],
            userName: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
            confirmPassword: ['', Validators.required]
        }, { validators: this.passwordMatchValidator });
    }
    passwordMatchValidator(g: FormGroup) {
        return g.get('password').value === g.get('confirmPassword').value ? null : { 'mismatch': true };
    }

    register(): void {
        console.log("register clicked");
        this.user = Object.assign({}, this.registerForm.value);
          this.authService.register(this.user)
            .subscribe(serviceResult => {
                if(!serviceResult.hasError)
                {

                    this.user = serviceResult.model;
                    console.log(serviceResult.message);
                    this.validatonMsg = serviceResult.message;
                }
                else
                {
                    console.log(serviceResult.message);
                }
                // if (status) {
                //     this.growler.growl('Logged in', GrowlerMessageType.Info);
                //     if (this.authService.redirectUrl) {
                //         const redirectUrl = this.authService.redirectUrl;
                //         this.authService.redirectUrl = '';
                //         this.router.navigate([redirectUrl]);
                //     } else {
                //         this.router.navigate(['/customers']);
                //     }
                // } else {
                //     const loginError = 'Unable to login';
                //     this.errorMessage = loginError;
                //     this.growler.growl(loginError, GrowlerMessageType.Danger);
                // }
            })
            // ,
            // (err: any) => this.logger.log(err));
    }

}
