import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {

    
    
  }

  usuario(){
    console.log(this.authService.username);
    this.authService.cerrarSesion()
  }

}
