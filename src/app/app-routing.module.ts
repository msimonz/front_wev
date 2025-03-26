import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MascotaTableComponent } from './mascotas/mascota-table/mascota-table.component';
import { MascotaDetallesComponent } from './mascotas/mascota-detalles/mascota-detalles.component';
import { MascotaUpdateComponent } from './mascotas/mascota-update/mascota-update.component';
import { MascotaFormComponent } from './mascotas/mascota-form/mascota-form.component';
import { HomeComponent } from './home/home/home.component';
import { SobreNosotrosComponent } from './sobre-nosotros/sobre-nosotros.component'; // Asegúrate de que esto esté importado
import { ServiciosComponent } from './servicios/servicios.component'; // Asegúrate de que esto esté importado


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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
