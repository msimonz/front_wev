import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/model/cliente';
import { ClienteService } from 'src/app/service/cliente.service';
import { Mascota } from 'src/app/model/mascota';

@Component({
  selector: 'app-cliente-detalles',
  templateUrl: './cliente-detalles.component.html',
  styleUrls: ['./cliente-detalles.component.css']
})
export class ClienteDetallesComponent implements OnInit {
  cliente!: Cliente;
  mascotas: Mascota[] = []; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService 
  ) { }

  ngOnInit(): void {
    
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));

      this.clienteService.findById(id).subscribe({
        next: (cliente) => {
          this.cliente = cliente;
          console.log('Cliente cargado:', this.cliente);

          
          this.clienteService.getMascotasByClienteId(id).subscribe({
            next: (mascotas) => {
              console.log('Mascotas del cliente:', mascotas); 
              this.mascotas = mascotas;
            },
            error: (error) => {
              console.error('Error al cargar las mascotas:', error);
            }
          });
        },
        error: (error) => {
          console.error('Error al cargar cliente:', error);
          alert('Error al cargar los detalles del cliente');
          this.router.navigate(['/cliente/tablaClientes']);
        }
      });
    });
  }
}
