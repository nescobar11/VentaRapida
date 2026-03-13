import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../Services/data.service';
import { Sale } from '../Models/venta.models';

@Component({
  selector: 'app-detalle-venta',
  templateUrl: './detalle-venta.component.html',
  styleUrls: ['./detalle-venta.component.css']
})
export class DetalleVentaComponent implements OnInit {
  sale: Sale = null;
  loading: boolean = true;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit() {
    // Obtenemos el ID de la ruta /sales/:id
    const id = +this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.cargarDetalle(id);
    } else {
      this.errorMessage = "ID de venta no válido";
      this.loading = false;
    }
  }

  cargarDetalle(id: number) {
    this.loading = true;
    this.dataService.getSaleById(id).subscribe(
      (res: Sale) => {
        this.sale = res;
        this.loading = false;
      },
      (err) => {
        this.errorMessage = "No se encontró la venta o hubo un error en el servidor.";
        this.loading = false;
        console.error(err);
      }
    );
  }

  volver() {
    this.router.navigate(['/']); // Regresa a la pantalla de ventas
  }
}