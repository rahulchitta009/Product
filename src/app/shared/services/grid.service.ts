import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Response, RequestOptions, Http, Headers } from "@angular/http";
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import { tap } from 'rxjs/operators/tap';
import 'rxjs/add/operator/catch';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '../user.model';
import { Product } from '../product.model';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

const CREATE_ACTION = 'create';
const UPDATE_ACTION = 'update';
const REMOVE_ACTION = 'destroy';

@Injectable()
export class GridService{
    readonly rootUrl =  'https://localhost:44368/api/Product';
    dialogData: any;
    constructor(private http: Http, private router: Router, private httpClient: HttpClient,
                          private toastr: ToastrService) { 
    
  }
  private data: any[] = [];
  getProducts():Observable<Product[]> {
    return this.http.get(this.rootUrl)
           .map((res: Response) => <Product[]>res.json())
           .catch(error => 
              {
                this.router.navigate(['materialTable']);
                console.log(error);
                return Observable.throw(false);
              });
  }

  public save(data:any){
     let headers = new Headers({ 'Content-Type': 'application/json' });
     let options = new RequestOptions({ headers: headers });
     return this.http.post(this.rootUrl, data, options).subscribe(res => {
       this.dialogData = data;
       this.toastr.success('Successfully Added');
     },
    (err: HttpErrorResponse) => {
      this.toastr.error('Error Occurred. Details: ' + err.name, err.message);
    });         
  }

  public updateItem(data:any){
    let id = data.productId;
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.put(this.rootUrl + '/' + id, data, options).subscribe(res => {
      this.dialogData = data;
      this.toastr.success('Update Successfull');
    },
    (err: HttpErrorResponse) => {
      this.toastr.error('Error Occurred. Details: ' + err.name, err.message);
    });
  }

  public remove(data:any){
      let id = data.productId;
     return this.http.delete(this.rootUrl +'/'+ id)
         .subscribe(res => {
             console.log(res['']);
             this.toastr.success('Successfully Deleted');
         },
         (err: HttpErrorResponse) => {
             console.log('Error Occurred. Details: ' + err.name + err.message);
             this.toastr.error('Error Occurred. Details: ' + err.name + err.message);
         });
  }

  // public save(data:any){
  //    let headers = new Headers({ 'Content-Type': 'application/json' });
  //    let options = new RequestOptions({ headers: headers });
  //    return this.http.post(this.rootUrl, data, options)
  //        .map(res => true)
  //        .catch(this.handleError);      
  // }

  // public remove(data:any){
  //     let id = data.productId;
  //    let headers = new Headers({ 'Content-Type': 'application/json' });
  //    let options = new RequestOptions({ headers: headers });
  //   //  let urlFull = url.concat(id);
  //    return this.http.delete(this.rootUrl +'/'+ id)
  //        .subscribe(res => {
  //            console.log(res[''])
  //        },
  //        (err: HttpErrorResponse) => {
  //            console.log('Error Occurred. Details: ' + err.name + err.message);
  //        })
  // }

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