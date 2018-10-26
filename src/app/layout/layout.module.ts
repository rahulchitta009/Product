import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { LayoutComponent } from './layout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
    imports:[
        CommonModule,
        LayoutRoutingModule,
        NgbDropdownModule.forRoot()
    ],
    declarations:[
        LayoutComponent,
        HeaderComponent,
        SidebarComponent
    ]
})

export class LayoutModule{}