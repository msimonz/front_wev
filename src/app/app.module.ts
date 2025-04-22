import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MascotaTableComponent } from './mascotas/mascota-table/mascota-table.component';
import { MascotaDetallesComponent } from './mascotas/mascota-detalles/mascota-detalles.component';
import { MascotaFormComponent } from './mascotas/mascota-form/mascota-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MascotaUpdateComponent } from './mascotas/mascota-update/mascota-update.component';
import { HomeComponent } from './home/home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SobreNosotrosComponent } from './home/sobre-nosotros/sobre-nosotros.component';
import { ServiciosComponent } from './home/servicios/servicios.component';
import { HttpClientModule } from '@angular/common/http';
import { ClienteTableComponent } from './clientes/cliente-table/cliente-table.component';
import { ClienteDetallesComponent } from './clientes/cliente-detalles/cliente-detalles.component';
import { ClienteFormComponent } from './clientes/cliente-form/cliente-form.component';
import { ClienteUpdateComponent } from './clientes/cliente-update/cliente-update.component';
import { ClienteLoginComponent } from './auth/cliente-login/cliente-login.component';
import { DashboardEstadisticasComponent } from './dashboard/dashboard-estadisticas/dashboard-estadisticas.component';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    AppComponent,
    MascotaTableComponent,
    MascotaDetallesComponent,
    MascotaFormComponent,
    MascotaUpdateComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SobreNosotrosComponent,
    ServiciosComponent,
    ClienteTableComponent,
    ClienteDetallesComponent,
    ClienteFormComponent,
    ClienteUpdateComponent,
    ClienteLoginComponent,
    DashboardEstadisticasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
