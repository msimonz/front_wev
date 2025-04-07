import { Component } from '@angular/core';
import { Cliente } from '../../model/cliente';
import { ClienteService } from 'src/app/service/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent {
  formCliente: Cliente = {
    id: 0,
    nombre: '',
    apellido: '',
    usuario: '',
    telefono: '',
    email: '',
    contrasena: ''
  };

  constructor(
    private clienteService: ClienteService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.validarFormulario()) {
      const clienteParaEnviar = {
        nombre: this.formCliente.nombre,
        apellido: this.formCliente.apellido,
        usuario: this.formCliente.usuario,
        telefono: this.formCliente.telefono,
        email: this.formCliente.email,
        contrasena: this.formCliente.contrasena
      };

      this.clienteService.addCliente(clienteParaEnviar)
        .subscribe({
          next: (response) => {
            console.log('Cliente agregado exitosamente', response);
            alert('Cliente creado con éxito');
            this.router.navigate(['/cliente/tablaClientes']);
          },
          error: (error) => {
            console.error('Error al agregar cliente:', error);
            alert('Error al agregar el cliente: ' + error.message);
          }
        });
    } else {
      alert('Por favor, complete todos los campos requeridos');
    }
  }

  validarFormulario(): boolean {
    return !!(this.formCliente.nombre && 
              this.formCliente.apellido && 
              this.formCliente.usuario && 
              this.formCliente.telefono && 
              this.formCliente.email && 
              this.formCliente.contrasena);
  }

  cancelar() {
    this.router.navigate(['/cliente/tablaClientes']);
  }
}
