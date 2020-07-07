import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store } from '../../../models/store';
import { StoreService } from '../../../core/services/store.service';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'addestore.component',
  templateUrl: 'addstore.component.html'
})
export class AddStoreComponent implements OnInit {
  addStoreForm: FormGroup;
  store: Store;

  constructor(
    public dialogRef: MatDialogRef<AddStoreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private storeService: StoreService) { }

  ngOnInit() {
    this.buildForm();
  }
  buildForm() {
    this.addStoreForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  addStore(): void {
    console.log("add store clicked");
    this.store = Object.assign({}, this.addStoreForm.value);
    this.store.userId = 1;
    this.storeService.addStore(this.store)
      .subscribe(serviceResult => {
        if (!serviceResult.hasError) {

          this.store = serviceResult.model;
          this.dialogRef.close();
        }
        else {
          console.log(serviceResult.message);
        }

      });
  }
}