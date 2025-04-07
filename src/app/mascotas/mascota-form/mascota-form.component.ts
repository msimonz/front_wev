import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MascotaService } from 'src/app/service/mascota.service';
import { ClienteService } from 'src/app/service/cliente.service';
import { Cliente } from 'src/app/model/cliente';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-mascota-form',
  templateUrl: './mascota-form.component.html',
  styleUrls: ['./mascota-form.component.css']
})
export class MascotaFormComponent implements OnInit {
  mascotaForm!: FormGroup;
  busquedaForm!: FormGroup;
  clientes: Cliente[] = [];
  clientesFiltrados: Cliente[] = [];
  clienteSeleccionado: Cliente | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private mascotaService: MascotaService,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    this.busquedaForm = this.formBuilder.group({
      terminoBusqueda: ['']
    });

    this.mascotaForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      edad: ['', [Validators.required, Validators.min(0)]],
      tipo: ['', Validators.required],
      raza: ['', Validators.required],
      sexo: ['', Validators.required],
      estado: ['', Validators.required],
      imagen: ['']
    });

    // Configurar la búsqueda con debounce
    this.busquedaForm.get('terminoBusqueda')?.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(termino => {
        this.filtrarClientes(termino);
      });

    this.cargarClientes();
  }

  cargarClientes(): void {
    this.clienteService.findAll().subscribe({
      next: (clientes) => {
        this.clientes = clientes;
        this.clientesFiltrados = clientes;
      },
      error: (error) => {
        console.error('Error al cargar clientes:', error);
        alert('Error al cargar la lista de clientes');
      }
    });
  }

  filtrarClientes(termino: string): void {
    if (!termino) {
      this.clientesFiltrados = this.clientes;
      return;
    }

    termino = termino.toLowerCase();
    this.clientesFiltrados = this.clientes.filter(cliente => 
      cliente.nombre.toLowerCase().includes(termino) ||
      cliente.apellido.toLowerCase().includes(termino) ||
      cliente.email.toLowerCase().includes(termino) ||
      cliente.usuario.toLowerCase().includes(termino)
    );
  }

  seleccionarCliente(cliente: Cliente): void {
    this.clienteSeleccionado = cliente;
    this.busquedaForm.get('terminoBusqueda')?.setValue('');
    this.clientesFiltrados = [];
  }

  limpiarSeleccion(): void {
    this.clienteSeleccionado = null;
  }

  onSubmit() {
    if (this.mascotaForm.valid && this.clienteSeleccionado) {
      const mascotaData = this.mascotaForm.value;

      this.mascotaService.addMascota(mascotaData, this.clienteSeleccionado.id)
        .subscribe({
          next: (response) => {
            console.log('Mascota agregada exitosamente', response);
            alert('Mascota creada con éxito');
            this.router.navigate(['/mascota/tablaMascotas']);
          },
          error: (error) => {
            console.error('Error al agregar mascota:', error);
            alert('Error al agregar la mascota: ' + error.message);
          }
        });
    } else if (!this.clienteSeleccionado) {
      alert('Por favor, seleccione un cliente');
    } else {
      this.marcarCamposInvalidos();
    }
  }

  marcarCamposInvalidos(): void {
    Object.keys(this.mascotaForm.controls).forEach(key => {
      const control = this.mascotaForm.get(key);
      if (control?.invalid) {
        control.markAsTouched();
      }
    });
  }

  cancelar() {
    this.router.navigate(['/mascota/tablaMascotas']);
  }
}
