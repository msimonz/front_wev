import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MascotaTableComponent } from './mascotas/mascota-table/mascota-table.component';
import { MascotaDetallesComponent } from './mascotas/mascota-detalles/mascota-detalles.component';
import { MascotaUpdateComponent } from './mascotas/mascota-update/mascota-update.component';
import { MascotaFormComponent } from './mascotas/mascota-form/mascota-form.component';
import { HomeComponent } from './home/home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


const routes: Routes = [
  {path: 'mascota/tablaMascotas', component: MascotaTableComponent},
  {path: 'home', component: HomeComponent},
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'mascota/detallesMascota/:id', component: MascotaDetallesComponent},
  {path:'mascota/actualizarMascota/:id', component: MascotaUpdateComponent},
  {path:'mascota/crearMascota', component: MascotaFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
