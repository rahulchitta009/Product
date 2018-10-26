import { NgModule } from '@angular/core';
import { CategoryComponent } from './category.component';
import { Routes, RouterModule } from "@angular/router";

const routes: Routes=[
    {
        path: '', 
        component: CategoryComponent
    }
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CategoryRoutingModule{}

