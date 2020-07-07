import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddStoreComponent } from '../stores/store-add/addstore.component';
import { EditStoreComponent } from '../stores/store-edit/editstore.component';
import { DeleteStoreComponent } from '../stores/store-delete/deletestore.component';
import { Store } from '../../models/store';
import { StoreService } from '../../core/services/store.service';
import { MatTableDataSource } from '@angular/material/table'
// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }
// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
//   { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
//   { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },

// ];

@Component({
  selector: 'Stores-Component',
  templateUrl: 'stores.component.html',
  styleUrls: ['stores.component.scss']
})
export class StoresComponent implements OnInit {
  store: Store;
  title = 'This is a store compnent2';
  displayedColumns: string[] = ['name', 'description','edit','delete'];
  dataSource : any;
  animal: string;
  name: string;
  constructor(public dialog: MatDialog,
    private storeService: StoreService) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddStoreComponent, {
      width: '250px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
    this.getStores();
    });
  }
  ngOnInit() {
    this.getStores();

  }
  mapObjectToArray(store:Store): any{
    let arr = [];  
    Object.keys(store).map(function(key){  
        arr.push({[key]:store[key]})  
        
    });  
    return arr;  
  } 
  getStores(): void {
    console.log("page loaded");

    this.storeService.getStores()
      .subscribe(serviceResult => {
        debugger;
        if (!serviceResult.hasError) {

          this.store = serviceResult.model;
          this.dataSource = this.store; 
          console.log(serviceResult.message);
        }
        else {
          console.log(serviceResult.message);
        }

      });
  }
  editopenDialog(id:number,name:string,description:string,userId:number): void {
    const dialogRef = this.dialog.open(EditStoreComponent, {
      width: '250px',
      data: { id: id, name: name, description:description,userId:userId}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getStores();
      });
  }
  deleteopenDialog(storeId:number): void {
    const dialogRef = this.dialog.open(DeleteStoreComponent, {
      width: '250px',
      data: { id: storeId}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getStores();
      });
  }
}