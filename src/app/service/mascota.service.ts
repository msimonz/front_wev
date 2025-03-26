import { Injectable } from '@angular/core';
import { Mascota } from '../model/mascota';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  constructor() { }

  mascotas: Mascota[] = [
      //Perros
      {
        id: 1,
        nombre: 'Max',
        edad: 3,
        especie: 'Perro',
        raza: 'Labrador',
        sexo: 'Macho',
        estado: 'Activo',
        imagen: 'https://cdn.pixabay.com/photo/2023/08/18/15/02/dog-8198719_1280.jpg'
      },
      {
        id: 2,
        nombre: 'Rocky',
        edad: 5,
        especie: 'Perro',
        raza: 'Pastor Alemán',
        sexo: 'Macho',
        estado: 'Inactivo',
        imagen: 'https://cdn.pixabay.com/photo/2020/11/22/20/12/schafer-dog-5767834_1280.jpg'
      },
      {
        id: 3,
        nombre: 'Buster',
        edad: 4,
        especie: 'Perro',
        raza: 'Bulldog',
        sexo: 'Macho',
        estado: 'Activo',
        imagen: 'https://cdn.pixabay.com/photo/2015/11/17/13/13/bulldog-1047518_1280.jpg'
      },
      {
        id: 4,
        nombre: 'Buddy',
        edad: 2,
        especie: 'Perro',
        raza: 'Golden Retriever',
        sexo: 'Macho',
        estado: 'Activo',
        imagen: 'https://cdn.pixabay.com/photo/2016/11/29/11/26/dog-1869167_1280.jpg'
      },
      {
        id: 5,
        nombre: 'Charlie',
        edad: 6,
        especie: 'Perro',
        raza: 'Beagle',
        sexo: 'Macho',
        estado: 'Inactivo',
        imagen: 'https://cdn.pixabay.com/photo/2017/03/27/13/23/dog-2178696_1280.jpg'
      },
  
      //Gatos
      {
        id: 6,
        nombre: 'Whiskers',
        edad: 2,
        especie: 'Gato',
        raza: 'Siamés',
        sexo: 'Macho',
        estado: 'Activo',
        imagen: 'https://cdn.pixabay.com/photo/2023/08/18/01/32/cat-8197577_1280.jpg'
      },
      {
        id: 7,
        nombre: 'Luna',
        edad: 3,
        especie: 'Gato',
        raza: 'Persa',
        sexo: 'Hembra',
        estado: 'Activo',
        imagen: 'https://cdn.pixabay.com/photo/2022/06/19/04/25/cat-7271017_1280.jpg'
      },
      {
        id: 8,
        nombre: 'Mittens',
        edad: 1,
        especie: 'Gato',
        raza: 'Maine Coon',
        sexo: 'Hembra',
        estado: 'Activo',
        imagen: 'https://cdn.pixabay.com/photo/2016/01/20/13/05/cat-1151519_1280.jpg'
      },
      {
        id: 9,
        nombre: 'Simba',
        edad: 4,
        especie: 'Gato',
        raza: 'Bengala',
        sexo: 'Macho',
        estado: 'Activo',
        imagen: 'https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_1280.jpg'
      },
      {
        id: 10,
        nombre: 'Shadow',
        edad: 5,
        especie: 'Gato',
        raza: 'Europeo',
        sexo: 'Hembra',
        estado: 'Inactivo',
        imagen: 'https://cdn.pixabay.com/photo/2023/09/21/17/05/european-shorthair-8267220_1280.jpg'
      }
    ];

    findAll(){
      return this.mascotas;
    }

    findById(id: number):Mascota{
      return this.mascotas.find(mascotas => mascotas.id === id)!;
    }

    addMascota(mascota: Mascota){
      this.mascotas.push(mascota);
    }

    updateMascota(mascotaActualizada: Mascota): boolean{
      const index = this.mascotas.findIndex(m => m.id === mascotaActualizada.id);
      if(index >= 0){
        this.mascotas.splice(index, 1);
        return true;
      }
      return false;
      this.mascotas.splice(index, 1);
    }

    deleteMascota(id: number){
      const index: number = this.mascotas.findIndex(m => m.id === id);
      this.mascotas.splice(index, 1);
    }
}
