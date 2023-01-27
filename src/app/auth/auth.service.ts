import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AlertController, LoadingController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { User } from './user.model';
import { BehaviorSubject, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User>(null);
  isLoading = false;

  constructor(private http: HttpClient,
    public alertController: AlertController,
    private router: NavController,
    private loadingCtrl: LoadingController,
    private storage: Storage) { }

  autoLogin() {
    return from(this.storage.get('authData')).pipe(
      map(storedData => {
        const parsedData = JSON.parse(storedData)?.userData;
        
        if (!storedData || !parsedData.codigo_municipalidad) {
          return null;
        }
        const user = new User(
          parsedData.NickName,
          parsedData.Token,
          parsedData.codigo_municipalidad,
          parsedData.Nombre,
          parsedData.destino,
        );
        return user;
      }),
      tap(user => {
        if (user) {
          this.userSubject.next(user); 
        }
      }),
      map(user => {
        return !!user;
      })
    );
  }

  get isLogged() {
    return this.userSubject.asObservable().pipe(
      map(user => {
        if (user) {
          return !!user.getToken;
        } else {
          return false;
        }
      })
    );
  }

  iniciarSesion(username: string, password: string) {
    this.isLoading = true;

    let url = environment.server;
    url += '/log/' + username + "/" + password ;

    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Ingresando...' })
      .then(loadingEl => {
        loadingEl.present();
        this.http.get(url)
          .subscribe(
            (response) => {
              this.isLoading = false;
              loadingEl.dismiss();
              const info = JSON.parse(JSON.stringify(response)).AutenticarResult[0];
              
              if(info.Token != ""){
                this.setUserData(info)
                this.router.navigateForward('/dashboard');
              }else{
                this.mostrarAlerta('Error en el usuario o password.');
              }
            },
            (err) => {
              loadingEl.dismiss();
              this.mostrarAlerta('Error conectandose al servidor');
              this.userSubject.next(null);
            }
          );
      });
  }

  private setUserData(userData) {
    this.userSubject.next(
      new User(
        userData.NickName,
        userData.Token,
        userData.codigo_municipalidad,
        userData.Nombre, 
        userData.destino,
        
      )
    );
    this.guardarAuthData(userData);
  }

  get username() {
    return this.userSubject.asObservable().pipe(
      map(user => {
        if (user) {
          return user.username;
        } else {
          return null;
        }
      })
    );
  }

  get userInfo() {
    return this.userSubject.asObservable().pipe(
      map(user => {
        // console.log('UserSubject: ', user);
        if (user) {
          return user;
        } else {
          return null;
        }
      })
    );
  }

  mostrarAlerta(mensaje: string) {
    this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    }).then(alertEl => {
      alertEl.present();
    });
  }

  private guardarAuthData(userData) {
    const data = JSON.stringify({userData});
    this.storage.set('authData', data);
  }

  cerrarSesion() {
    this.storage.remove('authData').then(() => this.userSubject.next(null));
  }


}
