import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Importación de Rutas y Componentes
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VentaComponent } from '../Components/venta.component';
import { DetalleVentaComponent } from '../Components/detalle-venta.component';

// Importación del Servicio
import { DataService } from '../Services/data.service';

@NgModule({
  declarations: [
    AppComponent,
    VentaComponent,
    DetalleVentaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,          
    HttpClientModule,     
    AppRoutingModule      
  ],
  providers: [
    DataService           
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }