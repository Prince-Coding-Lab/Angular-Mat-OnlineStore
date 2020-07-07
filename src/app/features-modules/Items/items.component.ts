import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AddItemComponent } from '../items/item-add/additem.component';
import { EditStoreComponent } from '../stores/store-edit/editstore.component';
import { DeleteStoreComponent } from '../stores/store-delete/deletestore.component';
import { Item } from '../../models/item';
import { ItemService } from '../../core/services/item.service';

@Component({
  selector: 'items-Component',
  templateUrl: 'items.component.html',
  styleUrls: ['items.component.scss']
})
export class ItemsComponent implements OnInit {
  item: Item;
  title = 'This is a item compnent2';
  displayedColumns: string[] = ['name', 'description','edit','delete'];
  dataSource : any;
  animal: string;
  name: string;
  constructor(public dialog: MatDialog,
    private itemService: ItemService) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddItemComponent, {
      width: '250px',
      data: { name: this.name, animal: this.animal }
    });

    // dialogRef.afterClosed().subscribe(result => {
    // this.getItems();
    // });
  }
  ngOnInit() {
    this.getItems();

  }
  getItems(): void {
    console.log("page loaded");

    this.itemService.getItems()
      .subscribe(serviceResult => {
        debugger;
        if (!serviceResult.hasError) {

          this.item = serviceResult.model;
          this.dataSource = this.item; 
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
      this.getItems();
      });
  }
  deleteopenDialog(storeId:number): void {
    const dialogRef = this.dialog.open(DeleteStoreComponent, {
      width: '250px',
      data: { id: storeId}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getItems();
      });
  }
}