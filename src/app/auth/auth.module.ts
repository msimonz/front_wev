import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { VeterinarioLoginComponent } from './veterinario-login/veterinario-login.component';
import { ClienteLoginComponent } from './cliente-login/cliente-login.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@NgModule({
  declarations: [
    LoginComponent,
    AdminLoginComponent,
    VeterinarioLoginComponent,
    ClienteLoginComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    LoginComponent,
    AdminLoginComponent,
    VeterinarioLoginComponent,
    ClienteLoginComponent,
    HeaderComponent,
    FooterComponent
  ]
})
export class AuthModule { } 