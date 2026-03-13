export interface Product {
  Id: number;
  Name: string;
  Price: number;
  Stock: number;
}

export interface Customer {
  Id: number;
  Name: string;
  Email: string;
}

export interface Sale {
  Id?: number;
  CustomerId: number;
  SaleDate?: Date;
  Total: number;
  Items?: SaleItem[];
}

export interface SaleItem {
  ProductId: number;
  Quantity: number;
  UnitPrice: number;
  SubTotal: number;
}