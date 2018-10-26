import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GridModule, PDFModule, ExcelModule } from '@progress/kendo-angular-grid';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
    imports:[
        DashboardRoutingModule,
        CommonModule,
        GridModule,
        PDFModule,
        ExcelModule,
        FormsModule
    ],
    declarations:[DashboardComponent]
})

export class DashboardModule{}
