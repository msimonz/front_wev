import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MascotaTableComponent } from './mascotas/mascota-table/mascota-table.component';
import { MascotaDetallesComponent } from './mascotas/mascota-detalles/mascota-detalles.component';
import { MascotaUpdateComponent } from './mascotas/mascota-update/mascota-update.component';
import { MascotaFormComponent } from './mascotas/mascota-form/mascota-form.component';
import { HomeComponent } from './home/home/home.component';
import { SobreNosotrosComponent } from './home/sobre-nosotros/sobre-nosotros.component';
import { ServiciosComponent } from './home/servicios/servicios.component';
import { ClienteTableComponent } from './clientes/cliente-table/cliente-table.component';
import { ClienteDetallesComponent } from './clientes/cliente-detalles/cliente-detalles.component';
import { ClienteUpdateComponent } from './clientes/cliente-update/cliente-update.component';
import { ClienteFormComponent } from './clientes/cliente-form/cliente-form.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'sobre-nosotros', component: SobreNosotrosComponent },
  { path: 'servicios', component: ServiciosComponent },
  
  // Rutas de mascotas
  { path: 'mascota/tablaMascotas', component: MascotaTableComponent },
  { path: 'mascota/detallesMascota/:id', component: MascotaDetallesComponent },
  { path: 'mascota/actualizarMascota/:id', component: MascotaUpdateComponent },
  { path: 'mascota/crearMascota', component: MascotaFormComponent },

  // Rutas de clientes
  { path: 'cliente/tablaClientes', component: ClienteTableComponent },
  { path: 'cliente/detallesCliente/:id', component: ClienteDetallesComponent },
  { path: 'cliente/actualizarCliente/:id', component: ClienteUpdateComponent },
  { path: 'cliente/crearCliente', component: ClienteFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
