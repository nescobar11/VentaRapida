import { Component, OnInit } from '@angular/core';
import { DataService } from '../Services/data.service'; 
import { Product, Customer, Sale, SaleItem } from '../Models/venta.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {
  

  customers: Customer[] = [];
  products: Product[] = [];
  selectedCustomerId: number = null;
  selectedProductId: number = null;
  quantity: number = 1;
  cart: any[] = [];
  total: number = 0;
  saleIdRetornado: number = null;
  errorMessage: string = '';

  constructor(
    private dataService: DataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarCombos();
  }

  cargarCombos() {
    this.dataService.getCustomers().subscribe(
      res => this.customers = res,
      err => this.errorMessage = 'Error al cargar clientes'
    );
    this.dataService.getProducts().subscribe(
      res => this.products = res,
      err => this.errorMessage = 'Error al cargar productos'
    );
  }

  addToCart() {
    if (!this.selectedProductId || this.quantity <= 0) return;

    const productoSeleccionado = this.products.find(p => p.Id == this.selectedProductId);

    if (productoSeleccionado) {
  
      const itemExistente = this.cart.find(i => i.ProductId == productoSeleccionado.Id);
      
      if (itemExistente) {
        itemExistente.Quantity += this.quantity;
        itemExistente.SubTotal = itemExistente.Quantity * itemExistente.UnitPrice;
      } else {
        const nuevoItem = {
          ProductId: productoSeleccionado.Id,
          ProductName: productoSeleccionado.Name, 
          Quantity: this.quantity,
          UnitPrice: productoSeleccionado.Price,
          SubTotal: this.quantity * productoSeleccionado.Price
        };
        this.cart.push(nuevoItem);
      }

      this.calcularTotal();
      this.resetSeleccion();
    }
  }


  calcularTotal() {
    this.total = this.cart.reduce((acc, item) => acc + item.SubTotal, 0);
  }

  resetSeleccion() {
    this.selectedProductId = null;
    this.quantity = 1;
  }

  eliminarItem(index: number) {
    this.cart.splice(index, 1);
    this.calcularTotal();
  }

  guardarVenta() {
    if (!this.selectedCustomerId || this.cart.length === 0) {
      alert("Por favor seleccione un cliente y agregue productos.");
      return;
    }

  
    const itemsParaApi: SaleItem[] = this.cart.map(item => ({
      ProductId: item.ProductId,
      Quantity: item.Quantity,
      UnitPrice: item.UnitPrice,
      SubTotal: item.SubTotal
    }));

    const nuevaVenta: Sale = {
      CustomerId: this.selectedCustomerId,
      Total: this.total,
      Items: itemsParaApi
    };

    this.dataService.createSale(nuevaVenta).subscribe(
      (res: any) => {
       
        this.saleIdRetornado = res.Id || res; 
        this.cart = [];
        this.total = 0;
        console.log('Venta guardada con éxito, ID:', this.saleIdRetornado);
      },
      err => {
        console.error(err);
        this.errorMessage = 'No se pudo guardar la venta. Verifique la conexión con el servidor.';
      }
    );
  }

  verDetalle() {
    if (this.saleIdRetornado) {
      this.router.navigate(['/sales', this.saleIdRetornado]);
    }
  }
}