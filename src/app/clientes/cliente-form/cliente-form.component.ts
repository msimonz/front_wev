import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/service/cliente.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {
  clienteForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.clienteForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      usuario: ['', [Validators.required, Validators.minLength(4)]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.clienteForm.valid) {
      const clienteParaEnviar = this.clienteForm.value;

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
      this.marcarCamposInvalidos();
    }
  }

  marcarCamposInvalidos(): void {
    Object.keys(this.clienteForm.controls).forEach(key => {
      const control = this.clienteForm.get(key);
      if (control?.invalid) {
        control.markAsTouched();
      }
    });
  }

  cancelar() {
    this.router.navigate(['/cliente/tablaClientes']);
  }
}
