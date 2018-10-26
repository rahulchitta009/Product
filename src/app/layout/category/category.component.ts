import { Component, OnInit } from '@angular/core';
import { GridComponent, GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';
import { Product } from '../../shared/product.model';
import { GridService } from '../../shared/services/grid.service';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/Operators/map';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  providers:[GridService]
})
export class CategoryComponent implements OnInit {
  public products: Product[];
  public prodDetails: Product;
  public columnsDisplayed: any[];
  public columnsToPrint: any[];

  public isNew: boolean;
  public editDataItem: Product;
  dataItem: any;

  constructor(private gridService: GridService, private router: Router) { 
    this.columnsDisplayed = [
            { field: "productId", title: "ID", width: "50", locked: true},
            { field: "productName", title: "Name", width: "80", locked: true},
            {field: "productCode", title: "Code", width: "60", locked: false},
            {field: "tag", title: "P-Tag", width: "70", locked: false},
            { field: "price", title: "Price", width: "70", locked: false},
            { field: "categoryName", title: "Category", width: "120", locked: false},
            {field: "purchaseDate", title: "Purchase Date", width: "120", locked: false},
            { field: "quantityPurchased", title: "Quantity Purchased", width: "120", locked: false},
            { field: "quantityInStock", title: "In Order", width: "90", locked: false},
            {field: "colorsPurchased", title: "Colors", width:"70", locked: false},
            {field: "sizes", title: "Sizes", width: "60", locked: false},
            { field: "supplierName", title: "Supplier Name", width: "120", locked: false}
    ];
    this.columnsToPrint = [
          {field: "productId", title: "ID"},
          {field: "productName", title: "Name"},
          {field: "price", title: "Price"}
        ]
  }

  ngOnInit() {
    this.getProducts();
  }

  public getProducts(){
    this.gridService.getProducts().subscribe(
      (data:Product[]) => {
      if(data.length>0){
        this.products = data;
      }
      else{
        this.products = [];
      }
    });
  }

  public isSelected(event){
    console.log("Row Clicked", event.dataItem.productId);
    this.dataItem = event.dataItem;
    //this.router.navigateByUrl('');
    this.editHandler(this.dataItem);
  }

  public addHandler() {
        this.editDataItem = new Product();
        this.isNew = true;
    }

  //   public viewHandler(event){
  //     let id = event.path[2].cells[0].innerText;
  // //    console.log("Id: ", id);
  //   }

    public editHandler({dataItem}) {
              this.editDataItem = dataItem;
      if(dataItem == undefined)
      {
        this.editDataItem = this.dataItem;
        dataItem = this.dataItem;
      }
        let splitDate = dataItem.purchaseDate.split('/');
        const year = parseInt(splitDate[0]);
        const month = parseInt(splitDate[1]);
        const day = parseInt(splitDate[2]);
        this.editDataItem.firstOrderedOn = new Date(year, month, day);
        this.isNew = false;
    }

    public cancelHandler() {
        this.editDataItem = undefined;
    }

    public saveHandler(product: Product) {
        this.gridService.save(product);

        this.editDataItem = undefined;
        this.getProducts();
    }

    public updateHandler(product: Product){
      product.purchaseDate = product.firstOrderedOn.toString();
      this.gridService.updateItem(product);

      this.editDataItem = undefined;
      this.getProducts();
    }

    public removeHandler({dataItem}) {
        this.gridService.remove(dataItem);
        this.getProducts();
    }

}
