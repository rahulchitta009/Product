import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from '../router-animations';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../shared/services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {

  errors: string;
  isRequesting: boolean;
  submitted: boolean = false;
  email: string = '';
  password: string = '';
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";

    constructor(public router: Router, private activatedRoute: ActivatedRoute,
                          private userService: UserService) {}

    ngOnInit() {}

    onLogin(email, password) {
    this.submitted = true;
    this.isRequesting = true;
    this.errors='';
      this.userService.login(email, password)
        // .finally(() => this.isRequesting = false)
        .subscribe(
        result => {         
          if (result) {
            let returnUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl');
             this.router.navigate([returnUrl || '/dashboard']);             
          }
        },
        error => this.errors = error);
  }
}
