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
import { SobreNosotrosComponent } from './sobre-nosotros/sobre-nosotros.component';
import { ServiciosComponent } from './servicios/servicios.component';


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
    ServiciosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
