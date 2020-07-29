import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoresRoutingModule } from './stores-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MatTableModule } from '@angular/material/table';

@NgModule({
    imports: [CommonModule, StoresRoutingModule, MatTableModule, SharedModule],
    declarations: [StoresRoutingModule.components]
})
export class StoresModule { }