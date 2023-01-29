import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from './auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' }
  ];
  constructor(private storage: Storage,
    private authService: AuthService,
    private router: NavController) {}

  async ngOnInit() {
    // If using a custom driver:
    // await this.storage.defineDriver(MyCustomDriver)
    await this.storage.create();
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
    this.router.navigateBack('/auth').then(() => {
      //this.splashScreen.show();
      window.location.reload();
    });
  }
}
