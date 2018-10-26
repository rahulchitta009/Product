import { Component, OnInit } from '@angular/core';
import { GridComponent } from '@progress/kendo-angular-grid';
import { products } from '../../shared/products';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public products: any[];
  public columnsDisplayed: any[];
  public columnsToPrint: any[];

  constructor() {
    this.columnsDisplayed = [
            { field: "Product", title: "Product", width: 100, locked: "true"},
            { field: "ProductID", title: "ID", width: 100, locked: "true"},
            { field: "ProductName", title: "Name", width: 120, locked: "true"},
            { field: "Category.CategoryName", title: "Category", width: 120, locked:""},
            { field: "UnitPrice", title: "Price", width: 90, locked:""},
            { field: "UnitsInStock", title: "In Stock", width: 90, locked:""},
            { field: "UnitsOnOrder", title: "On Order", width: 90, locked:""}
            // { field: "", title: "Edit", width:40, locked:""}
        ];
        this.columnsToPrint = [
          {field: "ProductID", title: "ID"},
          {field: "ProductName", title: "Name"},
          {field: "UnitPrice", title: "Price"}
        ]
   }

  ngOnInit() {
    this.products = products;
  }

  onRightClick(event){
    if(event.which === 3){
          console.log("Grid Menu has been Clicked!!");
    }
    return false;
  }

  public exportToPDF(grid: GridComponent):void{
    grid.saveAsPDF();
  }

}

export interface Product{
  Product: string,
  ProductId: number,
  ProductName: string,
  SupplierId: number,
  CategoryId: number,
  QuantityPerUnit: string,
  UnitPrice: number,
  UnitsInStock: number,
  UnitsOnOrder: number,
  ReorderLevel: number,
  Discontinued: boolean,
  Category:Category,
  FirstOrderedOn:Date
}

export interface Category{
  CategoryId:number,
  CategoryName:string, 
  Description:string
}
