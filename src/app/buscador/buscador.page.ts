import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonList } from '@ionic/angular';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.page.html',
  styleUrls: ['./buscador.page.scss'],
})
export class BuscadorPage implements OnInit {

  public list = [
  ]

  public listMostar = []
  private tamanoList = 0

  public seachUrl = ""
  public inputPlaceHolder = ""
  public input = true

  @ViewChild("list", { read: ElementRef }) private listComponent: ElementRef;

  constructor() { }

  ngOnInit() {
    this.listMostar = this.list
    this.tamanoList = this.listMostar.length
  }


  filtrar(event) {
    const filtro = event.detail.value.toLowerCase();
    this.listMostar = this.list.filter(item => item.nombre.toLowerCase().includes(filtro));
    if(this.tamanoList != this.listMostar.length){
      this.tamanoList = this.listMostar.length
      this.animList(this.listComponent.nativeElement)
    }
  }

  animList(item) {
    item.classList.remove('animacion');
    void item.offsetWidth;
    item.classList.add('animacion');
  }

  clickItem(item){
    item.srcElement.classList.add('animacion-click');
  }


}
