import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GridModule, PDFModule, ExcelModule } from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { DatePickerModule } from '@progress/kendo-angular-dateinputs';
import { MultiSelectModule } from '@progress/kendo-angular-dropdowns';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { GridEditFormComponent } from './edit.form.component';

@NgModule({
    imports:[
        CommonModule,
        GridModule,
        PDFModule,
        ExcelModule,
        CategoryRoutingModule,
        DialogModule,
        ReactiveFormsModule,
        HttpClientModule,
        DatePickerModule,
        MultiSelectModule
    ],
    declarations:[
        CategoryComponent,
        GridEditFormComponent
    ]
})

export class CategoryModule{}