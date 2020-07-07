import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsRoutingModule } from './items-routing.module';
import{SharedModule} from '../../shared/shared.module';
import {MatTableModule} from '@angular/material/table';
@NgModule({
    imports: [ CommonModule, ItemsRoutingModule,MatTableModule,SharedModule ],
    declarations: [ ItemsRoutingModule.components ]
})
export class ItemsModule { }