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
import { LoginComponent } from './auth/login/login.component';
import { VeterinarioDetallesComponent } from './veterinarios/veterinario-detalles/veterinario-detalles.component';
import { VeterinarioSuministrarComponent } from './veterinarios/veterinario-suministrar/veterinario-suministrar.component';
import { VeterinarioTableComponent } from './veterinarios/veterinario-table/veterinario-table.component';
import { VeterinarioFormsComponent } from './veterinarios/veterinario-forms/veterinario-forms.component';
import { VeterinarioUpdateComponent } from './veterinarios/veterinario-update/veterinario-update.component';
import { AdminDashboardComponent } from 'src/app/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'sobre-nosotros', component: SobreNosotrosComponent },
  { path: 'servicios', component: ServiciosComponent },
  
  // Ruta unificada de login
  { path: 'login', component: LoginComponent },
  
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

  // Rutas de veterinarios
  { path: 'veterinario/detallesVeterinario/:id', component: VeterinarioDetallesComponent },
  { path: 'veterinario/suministrar/:id', component: VeterinarioSuministrarComponent },
  { path: 'veterinario/tablaVeterinarios', component: VeterinarioTableComponent },
  { path: 'veterinario/nuevo', component: VeterinarioFormsComponent },
  { path: 'veterinario/actualizarVeterinario/:id', component: VeterinarioUpdateComponent },

  // Ruta del dashboard de administrador
  { path: 'admin/dashboard', component: AdminDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
