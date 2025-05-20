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
import { SobreNosotrosComponent } from './home/sobre-nosotros/sobre-nosotros.component';
import { ServiciosComponent } from './home/servicios/servicios.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClienteTableComponent } from './clientes/cliente-table/cliente-table.component';
import { ClienteDetallesComponent } from './clientes/cliente-detalles/cliente-detalles.component';
import { ClienteFormComponent } from './clientes/cliente-form/cliente-form.component';
import { ClienteUpdateComponent } from './clientes/cliente-update/cliente-update.component';
import { VeterinarioDetallesComponent } from './veterinarios/veterinario-detalles/veterinario-detalles.component';
import { VeterinarioSuministrarComponent } from './veterinarios/veterinario-suministrar/veterinario-suministrar.component';
import { VeterinarioTableComponent } from './veterinarios/veterinario-table/veterinario-table.component';
import { VeterinarioUpdateComponent } from './veterinarios/veterinario-update/veterinario-update.component';
import { VeterinarioFormsComponent } from './veterinarios/veterinario-forms/veterinario-forms.component';
import { AdminDashboardComponent } from 'src/app/dashboard/dashboard.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { AuthModule } from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    MascotaTableComponent,
    MascotaDetallesComponent,
    MascotaFormComponent,
    MascotaUpdateComponent,
    HomeComponent,
    SobreNosotrosComponent,
    ServiciosComponent,
    ClienteTableComponent,
    ClienteDetallesComponent,
    ClienteFormComponent,
    ClienteUpdateComponent,
    VeterinarioDetallesComponent,
    VeterinarioSuministrarComponent,
    VeterinarioTableComponent,
    VeterinarioUpdateComponent,
    VeterinarioFormsComponent,
    AdminDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    AuthModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
