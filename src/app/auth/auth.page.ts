import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  constructor(private authService: AuthService, private router: NavController) { }

  loguear(form: NgForm) {
    if((form.value.user != "" && form.value.user != undefined)  && (form.value.pass != "" && form.value.pass != undefined))
      this.authService.iniciarSesion(form.value.user, form.value.pass);
    else
      this.authService.mostrarAlerta("Complete todos los datos")

    //form.reset();
  }
  ngOnInit() {
  }

  ionViewDidEnter() {
  }

  ionViewWillLeave() {
  }

}
