import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VentaComponent } from '../Components/venta.component'; 
import { DetalleVentaComponent } from '../Components/detalle-venta.component';

const routes: Routes = [
  { path: '', component: VentaComponent },               
  { path: 'sales/:id', component: DetalleVentaComponent }, 
  { path: '**', redirectTo: '' }                           
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }