import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children:[
            {path:'', redirectTo:'dashboard', pathMatch: 'prefix'},
            {path:'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'},
            {path:'materialTable', loadChildren: './material/material.module#MaterialModule'},
            {path:'categoryList', loadChildren: './category/category.module#CategoryModule'},
            {path:'fileUpload', loadChildren: './upload/upload.module#UploadModule'},
            {path:'billing', loadChildren: './billing/billing.module#BillingModule'}
        ]
    }
];

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class LayoutRoutingModule{}