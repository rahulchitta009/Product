import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material';

import { MaterialRoutingModule } from './material-routing.module';
import { MaterialComponent } from './material.component';

@NgModule({
    imports:[
        CommonModule,
        MatTableModule,
        MatPaginatorModule,
        MaterialRoutingModule
    ],
    declarations:[
        MaterialComponent
    ]
})
export class MaterialModule {}