import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Product, Customer, Sale } from '../Models/venta.models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // GET /api/products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/products`);
  }

  // GET /api/customers
  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.url}/customers`);
  }

  // POST /api/sales
  createSale(sale: Sale): Observable<any> {
    return this.http.post(`${this.url}/Addsale`, sale);
  }

  // GET /api/sales/{id}
  getSaleById(id: number): Observable<Sale> {
    return this.http.get<Sale>(`${this.url}/sales/${id}`);
  }
}