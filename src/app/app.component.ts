import { Component,OnInit } from '@angular/core';
import{LoginComponent} from './users/login/login.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { User } from '../app/models/user';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'online-mat-store';
  isAuthenticated:boolean;
  userName:string;
  constructor(public dialog: MatDialog) {}
  login(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
     
    });
    const sub = dialogRef.componentInstance.isAuthenticated.subscribe((data: any) => {
      this.isAuthenticated =true;
      this.userName = data.userName;
      console.log(data)
  });
}
ngOnInit() {
const user: User = JSON.parse(localStorage.getItem("user"));

}
logout():void{
  localStorage.removeItem('user');
  this.isAuthenticated = false;
  this.userName ="";
console.log("log me out");

}
}
