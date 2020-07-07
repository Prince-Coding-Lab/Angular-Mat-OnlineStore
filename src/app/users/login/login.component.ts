import { Component,OnInit, Inject, Input ,Output, EventEmitter,} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from '../../models/user';
import { AuthService } from '../../core/services/auth.service';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'login.component',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: User;
 
  @Output() isAuthenticated = new EventEmitter();
  
  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private authService: AuthService) { }

  ngOnInit() {
    this.buildForm();
  }
  authenticated() {
    // this.stockValueChange.emit({ id: this.productId, updatdstockvalue: this.updatedstockvalue });
    // this.updatedstockvalue = null;
    this.isAuthenticated.emit(true);
}
  buildForm() {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  registerDialog(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '350px'
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  login(): void {
    console.log("login clicked");
    this.user = Object.assign({}, this.loginForm.value);
    this.authService.login(this.user)
      .subscribe(serviceResult => {
        if (!serviceResult.hasError) {
          debugger;

          this.user = serviceResult.model;
          localStorage.setItem('user', JSON.stringify(this.user));
          this.isAuthenticated.emit(this.user);
          this.dialogRef.close();
        }
        else {
          console.log(serviceResult.message);
        }
      })

  }
}