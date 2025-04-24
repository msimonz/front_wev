import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VeterinarioService } from 'src/app/service/veterinario.service';

@Component({
  selector: 'app-veterinario-forms',
  templateUrl: './veterinario-forms.component.html',
  styleUrls: ['./veterinario-forms.component.css']
})
export class VeterinarioFormsComponent implements OnInit {
  veterinarioForm!: FormGroup;
  loading: boolean = false;  // Definimos loading aquí
  error: string = '';        // Definimos error aquí

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private veterinarioService: VeterinarioService
  ) { }

  ngOnInit(): void {
    this.veterinarioForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      usuario: ['', [Validators.required, Validators.minLength(4)]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.veterinarioForm.valid) {
      this.loading = true;
      this.error = '';

      const veterinarioParaEnviar = this.veterinarioForm.value;

      this.veterinarioService.createVeterinario(veterinarioParaEnviar)
        .subscribe({
          next: (response) => {
            this.loading = false;
            alert('Veterinario creado con éxito');
            this.router.navigate(['/veterinario/tablaVeterinarios']);
          },
          error: (error) => {
            this.loading = false;
            console.error('Error al agregar veterinario:', error);
            this.error = 'Error al agregar el veterinario: ' + error.message;
          }
        });
    } else {
      this.marcarCamposInvalidos();
    }
  }

  marcarCamposInvalidos(): void {
    Object.keys(this.veterinarioForm.controls).forEach(key => {
      const control = this.veterinarioForm.get(key);
      if (control?.invalid) {
        control.markAsTouched();
      }
    });
  }

  cancelar() {
    this.router.navigate(['/veterinario/tablaVeterinarios']);
  }
}
