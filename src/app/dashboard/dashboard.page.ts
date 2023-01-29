import { Component, OnInit } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private authService: AuthService,
    private router: NavController) { }

  public user;
  public items = [
    {
      nombre: "Contribuyentes",
      imagen: "/assets/user.png",
      opciones: [
        {
          icono: "person",
          nombre: "Buscar por DNI"
        },
        {
          icono: "search",
          nombre: "Buscar por Nombre"
        },
      ]
    },
    {
      nombre: "Recaudaciones",
      imagen: "/assets/image_graficos.png",
      opciones: [
        {
          icono: "calendar",
          nombre: "Recaudaciones por fecha"
        },
        {
          icono: "calendar",
          nombre: "Recaudaciones por año"
        },
        {
          icono: "card",
          nombre: "Carnet de conductor"
        },
        {
          icono: "search",
          nombre: "Recibos por gravamen"
        },
      ]
    },
    {
      nombre: "Proveedores",
      imagen: "/assets/manos.png",
      opciones: [
        {
          icono: "search",
          nombre: "Buscar por Nombre"
        },
        {
          icono: "search",
          nombre: "Buscar por CUIT"
        },
        {
          icono: "search",
          nombre: "Buscar por Razon"
        },
      ]
    },
    {
      nombre: "Transito",
      imagen: "/assets/ic_auto_color.png",
      opciones: [
        {
          icono: "search",
          nombre: "Buscar por Patente"
        },
        {
          icono: "search",
          nombre: "Buscar por Nombre"
        },
        {
          icono: "person",
          nombre: "Buscar por DNI"
        },
      ]
    },
    {
      nombre: "Contabilidad",
      imagen: "/assets/contabilidad.png"
    },
  ]

  ngOnInit() {
    this.fetchProfileData();
  }


  fetchProfileData() {
    this.authService.userInfo.subscribe(perf => {
      this.user = perf
    });
  }

  onClickItem(event: any, i:any){

    let navigationExtras: NavigationExtras = {
      queryParams : {
        data : JSON.stringify(this.items[i])
      }
    }
    setTimeout(() =>{
      this.router.navigateForward('/item-options', navigationExtras)
    },300)
  }
}
