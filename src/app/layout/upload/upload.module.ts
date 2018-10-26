import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadComponent } from './upload.component';
import { UploadRoutingModule } from './upload-routing.module';

@NgModule({
    imports:[
        CommonModule,
        UploadRoutingModule
    ],
    declarations:[UploadComponent]
})

export class UploadModule{}