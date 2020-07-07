import {Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { StoreService } from '../../../core/services/store.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

export interface DialogData {
    animal: string;
    name: string;
  }
  
@Component({
    selector: 'delelestore.component',
    templateUrl: 'deletestore.component.html'
  })
  export class DeleteStoreComponent {
  
    constructor(
      public dialogRef: MatDialogRef<DeleteStoreComponent>,
      @Inject(MAT_DIALOG_DATA)  public data: any,
      private storeService: StoreService) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
    deleteStore(): void {
      console.log("delete store clicked");
      this.storeService.deleteStore(this.data.id)
        .subscribe(serviceResult => {
          this.dialogRef.close();
          if (!serviceResult.hasError) {
            console.log(serviceResult.message);
        
          }
          else {
            console.log(serviceResult.message);
          }
  
        });
    }
  }