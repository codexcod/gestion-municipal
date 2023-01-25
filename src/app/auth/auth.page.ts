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

  constructor(private athService: AuthService, private router: NavController) { }

  loguear(form: NgForm) {
    this.athService.iniciarSesion(form.value.user, form.value.pass);
    form.reset();
  }

  loginGoogle(){
    window.location.href = 'https://app.calim.com.ar/oauth/authenticate/google?callback=https://app.calim.com.ar/auth/successApp?token=';
  }

  irAlRegistro(){
    this.router.navigateForward('/registro');
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
  }

  ionViewWillLeave() {
  }

}
