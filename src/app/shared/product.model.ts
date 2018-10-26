export class Product{
  product: string;
  productId: number;
  productName: string;
  productCode: number;
  tag: string;
  supplierName: string;
  categoryName: string;
  price: number;
  quantityInStock: number;
  quantityPurchased: number;
  firstOrderedOn: Date;
  purchaseDate: string;
  colorsPurchased: number;
  sizes: number[];
}

export interface Category{
  CategoryId:number,
  CategoryName:string, 
  Description:string
}