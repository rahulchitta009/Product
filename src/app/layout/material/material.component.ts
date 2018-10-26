import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Product } from '../../shared/product.model';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})
export class MaterialComponent implements OnInit, AfterViewInit {
  product_data: Product[];
  displayedColumns = ['productId', 'productName', 'categoryName', 'price', 'supplierName'];
  dataSource;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private userService: UserService) { 

  }

  ngOnInit() {
      this.getProducts();
  }

  ngAfterViewInit(){
    
  }

  public getProducts(){
    this.userService.getProducts().subscribe(
      (data:Product[]) => {
      if(data.length>0){
        this.product_data = data;
        this.dataSource = new MatTableDataSource(this.product_data);
        this.dataSource.Paginator = this.paginator;
      }
      else{
        this.product_data = [];
      }
      });
  }

}
