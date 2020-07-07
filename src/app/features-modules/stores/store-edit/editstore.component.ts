import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StoreService } from '../../../core/services/store.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store } from '../../../models/store';
export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'editstore.component',
  templateUrl: 'editstore.component.html'
})
export class EditStoreComponent {
  editStoreForm: FormGroup;
  store: Store;

  constructor(
    public dialogRef: MatDialogRef<EditStoreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private storeService: StoreService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.storeService.getStore(this.data.id)
    .subscribe(serviceResult => {
      if (!serviceResult.hasError) {

        this.editStoreForm.setValue( serviceResult.model);
        console.log(serviceResult.message);
      }
      else {
        console.log(serviceResult.message);
      }

    });
    // this.store = this.data;
    this.buildForm();
  }
  buildForm() {
    this.editStoreForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
  updateStore(): void {
    console.log("add store clicked");
    this.store = Object.assign({}, this.editStoreForm.value);
    //this.store.userId = 1;
    this.storeService.updateStore(this.store,this.data.id)
      .subscribe(serviceResult => {
        if (!serviceResult.hasError) {

          this.store = serviceResult.model;
          console.log(serviceResult.message);
          this.dialogRef.close();
        }
        else {
          console.log(serviceResult.message);
        }

      });
  }
}