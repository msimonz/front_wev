import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/model/cliente';
import { Mascota } from 'src/app/model/mascota';
import { ClienteService } from 'src/app/service/cliente.service';
import { MascotaService } from 'src/app/service/mascota.service';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {
  clienteForm!: FormGroup;
  id!: number;
  mascotas: Mascota[] = [];
  errorMascotas: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService,
    private mascotaService: MascotaService
  ) { }

  ngOnInit(): void {
    this.clienteForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      usuario: ['', [Validators.required, Validators.minLength(4)]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarDatosCliente();
  }

  cargarDatosCliente(): void {
    this.clienteService.findById(this.id).subscribe({
      next: (cliente: Cliente) => {
        this.clienteForm.patchValue({
          nombre: cliente.nombre,
          apellido: cliente.apellido,
          usuario: cliente.usuario,
          telefono: cliente.telefono,
          email: cliente.email,
          contrasena: cliente.contrasena,
          mascotas: cliente.mascotas
        });
      },
      error: (error) => {
        console.error('Error al cargar cliente:', error);
        alert('Error al cargar los detalles del cliente');
        this.router.navigate(['/cliente/tablaClientes']);
      }
    });
  }

  guardarCambios(): void {
    if (this.clienteForm.valid) {
      const clienteActualizado: Cliente = {
        id: this.id,
        mascotas: this.mascotas,
        ...this.clienteForm.value
      };
      console.log(clienteActualizado);
      this.clienteService.updateCliente(clienteActualizado).subscribe({
        next: () => {
          alert('Cliente actualizado correctamente');
          this.router.navigate(['/cliente/detallesCliente', this.id]);
        },
        error: (err) => {
          console.error('Error al actualizar:', err);
          alert('Error al actualizar el cliente: ' + err.message);
        }
      });
    } else {
      this.marcarCamposInvalidos();
      alert('Por favor, complete todos los campos requeridos correctamente');
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

  loadMascotasCliente(clienteId: number): void {
    this.mascotaService.getMascotasByClienteId(clienteId).subscribe({
      next: (mascotas) => {
        this.mascotas = mascotas;
      },
      error: (error) => {
        console.error('Error al cargar mascotas:', error);
        this.errorMascotas = 'Error al cargar las mascotas del cliente';
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/cliente/tablaClientes']);
  }
}
