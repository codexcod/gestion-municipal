import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.page.html',
  styleUrls: ['./buscador.page.scss'],
})
export class BuscadorPage implements OnInit {

  public list = [
    {
      nombre : "Nahse"
    },
    {
      nombre : "Nahse"
    },
    {
      nombre : "Nahse"
    },
    {
      nombre : "Nahse"
    },
    {
      nombre : "Nahse"
    },
    {
      nombre : "Nahse"
    },
    {
      nombre : "Nahse"
    },
    {
      nombre : "Nahse"
    },
    {
      nombre : "Nahse"
    },
    {
      nombre : "Nahse"
    },
    {
      nombre : "Nahse"
    },
    {
      nombre : "Nahse"
    },
  ]

  constructor() { }

  ngOnInit() {
  }


  filtrar(event) {
    const filtro = event.detail.value.toLowerCase();
    //this.novedadesAMostrar = this.novedades.filter(novedad => novedad.nombre.toLowerCase().includes(filtro));
  }

}
