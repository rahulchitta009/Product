import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { GridModule, PDFModule, ExcelModule } from '@progress/kendo-angular-grid';

import { BillingComponent } from './billing.component';
import { BillingRoutingModule } from './billing-routing.module';

@NgModule({
    imports:[
        CommonModule,
        ReactiveFormsModule,
        GridModule,
        PDFModule,
        ExcelModule,
        BillingRoutingModule
    ],
    declarations:[BillingComponent]

})

export class BillingModule{}