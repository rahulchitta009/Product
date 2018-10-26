import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response, RequestOptions, Http, Headers } from "@angular/http";
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { User } from '../user.model';
import { Product } from '../product.model';
import { Router } from "@angular/router";
import { JwtHelperService } from '@auth0/angular-jwt';
 
@Injectable()
export class UserService {
  // readonly rootUrl = 'http://localhost:35257';
  readonly rootUrl = 'http://10.138.77.173:8040'; //'https://localhost:44304';    
  private loggedIn = false;
  constructor(private http: Http, private router: Router, private httpClient: HttpClient) { 
    this.loggedIn = !!localStorage.getItem('auth_token');
  }

  getProducts():Observable<Product[]> {
    return this.http.get('https://localhost:44368/api/Product')
           .map((res: Response) => <Product[]>res.json())
           .catch(error => 
              {
                this.router.navigate(['materialTable']);
                console.log(error);
                return Observable.throw(false);
              });
  }
 
  registerUser(user : User){
    const body: User = {
      // UserName: user.UserName,
      Email: user.Email,
      Password: user.Password,
      FirstName: user.FirstName,
      LastName: user.LastName,
      Role: user.Role
    }
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    // return this.http.post(this.rootUrl + '/api/User/Register', body);
    return this.http.post(this.rootUrl + '/api/Accounts', body, options)
       .map(res => true)
       .catch(this.handleError);
  }

  // userAuthentication(userName, password) {
  //   var data = "username=" + userName + "&password=" + password + "&grant_type=password";
  //   var reqHeader = new Headers({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
  //   return this.http.post(this.rootUrl + '/token', data, { headers: reqHeader });
  // }
  login(userName, password){
    let headers = new Headers({ 'Content-Type': 'application/json','No-Auth':'True' });

    return this.http
      .post(
      this.rootUrl + '/api/auth/login',
      JSON.stringify({ userName, password }),{ headers }
      )
      .map(res => res.json())
      .map(res => {
        localStorage.setItem('auth_token', res);
        this.loggedIn = true;
        return true;
      })
      .catch(this.handleError);
  }

  // getUserClaims(){
  //  return  this.http.get(this.rootUrl+'/api/GetUserClaims');
  // }

  logout(){
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }

  roleMatch(allowedRoles): boolean {
  var isMatch = false;
  // var userRoles: string[] = JSON.parse(localStorage.getItem('userRoles'));
  var userRoles: string = this.currentUser.rol
  allowedRoles.forEach(element => {
    if (userRoles.indexOf(element) > -1) {
      isMatch = true;
      return false;
    }
  });
  return isMatch;
}

  isLoggedIn(){
    // let jwtHelper = new JwtHelper();
    let jwtHelper = new JwtHelperService();
    let token = localStorage.getItem('auth_token');
    if(!token)
       return false;
    let expirationDate = jwtHelper.getTokenExpirationDate(token);
    let isExpired = jwtHelper.isTokenExpired(token);
    return !isExpired;
  }

  get currentUser(){
    let token = localStorage.getItem('auth_token');
    if(!token)
      return null;
    return new JwtHelperService().decodeToken(token);
  }

  resetMailLink(email){
    let headers = new Headers({ 'Content-Type': 'application/json','No-Auth':'True' });
    return this.http
       .post(
         this.rootUrl + '/api/auth/resetMailLink', '"'+email+'"', {headers}
       )
       .map(res => res.json())
       .map(res => {
         return true;
       })
       .catch(this.handleError);
  }

  resetPassword(oldPassword, newPassword){
    let email = this.currentUser.sub;
    let headers = new Headers({'Content-type': 'application/json', 'No-Auth': 'True'});
    return this.http
       .post(
         this.rootUrl + '/api/auth/resetPassword',
         JSON.stringify({email,oldPassword,newPassword}),
         {headers}
       )
       .map(res => res.json())
       .map(res => {return true;
       })
       .catch(this.handleError);
  }

  private handleError(error: any) {
    // var applicationError = error.headers.get('Application-Error');
    var applicationError = error._body;

    // either applicationError in header or model error in body
    if (applicationError) {
      return Observable.throw(applicationError);
    }

    var modelStateErrors: string = '';
    var serverError = error.json();

    if (!serverError.type) {
      for (var key in serverError) {
        if (serverError[key])
          modelStateErrors += serverError[key] + '\n';
      }
    }

    modelStateErrors = modelStateErrors = '' ? null : modelStateErrors;
    return Observable.throw(modelStateErrors || 'Server error');
  }
 
}