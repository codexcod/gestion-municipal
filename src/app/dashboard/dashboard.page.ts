import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private authService: AuthService) { }

  public user;
  public items = [
    {
      nombre: "Contribuyentes",
      imagen: "/assets/user.png",
      url: "contribuyentes"
    },
    {
      nombre: "Recaudaciones",
      imagen: "/assets/image_graficos.png",
      url: "recaudaciones"
    },
    {
      nombre: "Proveedores",
      imagen: "/assets/manos.png",
      url: "proveedores"
    },
    {
      nombre: "Transito",
      imagen: "/assets/ic_auto_color.png",
      url: "transito"
    },
    {
      nombre: "Contabilidad",
      imagen: "/assets/contabilidad.png",
      url: "contabilidad"
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
}
