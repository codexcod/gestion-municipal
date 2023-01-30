import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-item-options',
  templateUrl: './item-options.page.html',
  styleUrls: ['./item-options.page.scss'],
})
export class ItemOptionsPage implements OnInit {

  constructor(private route: ActivatedRoute) {}

  public data;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.data = JSON.parse(params["data"]);  
    });
  }

  clickItem(item) {
    item.srcElement.classList.remove('animacion');
    void item.srcElement.offsetWidth;
    item.srcElement.classList.add('animacion');
  }

}
