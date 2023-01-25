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
        const parsedData = JSON.parse(storedData);
        if (!storedData || !parsedData.roles) {
          return null;
        }
        const user = new User(
          parsedData.username,
          parsedData.token,
          parsedData.roles
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

    let url = environment.calimUrl;
    url += '/api/login';

    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Ingresando...' })
      .then(loadingEl => {
        loadingEl.present();
        this.http.post(url, JSON.stringify({ username, password }))
          .subscribe(
            (response) => {
              this.isLoading = false;
              loadingEl.dismiss();
              const info = JSON.parse(JSON.stringify(response));
              if (info.roles.includes('ROLE_CUENTA') || info.roles.includes('ROLE_EMPLEADOR') || info.roles.includes('ROLE_RIDER_PY')) {
                this.setUserData(info);
                //Consultar por la cuenta, si no tiene estado activo, redirijir a su action regsitro

                let urlCuenta = environment.calimUrl + '/api/cuenta/appGetCuenta';
                let head = new HttpHeaders();
                head = head.set('X-Auth-Token', info.access_token);

                this.http.get(urlCuenta, { headers: head }).subscribe(cnt => {
                  const cuenta = JSON.parse(JSON.stringify(cnt));
                  if (cuenta.estado == 'Activo') {
                    if (info.roles.includes('ROLE_RIDER_PY'))
                      this.router.navigateForward('/pedidosya/dashboard');
                    else
                      this.router.navigateForward('/dashboard');
                  } else {
                    this.router.navigateForward('/registro-steps/' + cuenta.actionRegistro);
                  }
                });

              } else {
                this.mostrarAlerta('El usuario ingresado no correponde a una cuenta');
              }
            },
            (err) => {
              loadingEl.dismiss();
              this.mostrarAlerta('Error en el usuario o password.');
              this.userSubject.next(null);
            }
          );
      });
  }

  private setUserData(userData) {
    this.userSubject.next(
      new User(
        userData.username,
        userData.access_token,
        userData.roles
      )
    );
    this.guardarAuthData(userData.username, userData.access_token,userData.roles);
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

  private guardarAuthData(
    username: string,
    token: string,
    roles:string[]
  ) {
    const data = JSON.stringify({username, token, roles});
    this.storage.set('authData', data);
  }

  cerrarSesion() {
    this.storage.remove('authData').then(() => this.userSubject.next(null));
  }


}
