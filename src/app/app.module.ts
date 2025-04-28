import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
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
import { VeterinarioLoginComponent } from './auth/veterinario-login/veterinario-login.component';
import { VeterinarioDetallesComponent } from './veterinarios/veterinario-detalles/veterinario-detalles.component';
import { VeterinarioSuministrarComponent } from './veterinarios/veterinario-suministrar/veterinario-suministrar.component';
import { VeterinarioTableComponent } from './veterinarios/veterinario-table/veterinario-table.component';
import { VeterinarioUpdateComponent } from './veterinarios/veterinario-update/veterinario-update.component';
import { VeterinarioFormsComponent } from './veterinarios/veterinario-forms/veterinario-forms.component';
import { AdminLoginComponent } from './auth//admin-login/admin-login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

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
    VeterinarioLoginComponent,
    VeterinarioDetallesComponent,
    VeterinarioSuministrarComponent,
    VeterinarioTableComponent,
    VeterinarioUpdateComponent,
    VeterinarioFormsComponent,
    AdminLoginComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
