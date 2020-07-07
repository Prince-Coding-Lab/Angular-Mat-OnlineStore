import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Item } from '../../../models/item';
import { ItemService } from '../../../core/services/item.service';
import { Store } from '../../../models/store';
import { StoreService } from '../../../core/services/store.service';
export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'additem.component',
  templateUrl: 'additem.component.html'
})
export class AddItemComponent implements OnInit {
    addItemForm: FormGroup;
    item: Item;
    stores: Store;
  constructor(
    public dialogRef: MatDialogRef<AddItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private itemService: ItemService,
    private storeService: StoreService) { }

  ngOnInit() {
    this.getStores();
    this.buildForm();
  }
  buildForm() {
    this.addItemForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, Validators.required],
      storeId: [null, Validators.required]
    });
  }
  getStores(): void {
    console.log("page loaded");

    this.storeService.getStores()
      .subscribe(serviceResult => {
        debugger;
        if (!serviceResult.hasError) {

          this.stores = serviceResult.model;
          console.log(serviceResult.message);
        }
        else {
          console.log(serviceResult.message);
        }

      });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  addItem(): void {
      debugger;
    console.log("add store clicked");
    this.item = Object.assign({}, this.addItemForm.value);
    this.item.userId = 1;
    this.item.storeId = Number(this.item.storeId);
    this.item.price = Number(this.item.price);
    this.itemService.addItem(this.item)
      .subscribe(serviceResult => {
        if (!serviceResult.hasError) {
debugger;
          this.item = serviceResult.model;
      //    this.dialogRef.close();
        }
        else {
          console.log(serviceResult.message);
        }

      });
  }
}