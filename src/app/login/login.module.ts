import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { UserService } from '../shared/services/user.service';

@NgModule({
    imports: [
        CommonModule, 
        LoginRoutingModule, 
        FormsModule,
        HttpModule,
        HttpClientModule
        ],
    declarations: [LoginComponent],
    providers: [UserService]
})

export class LoginModule{}