import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  dataUser: any;
  UserRol : string = "";

  constructor() { }

  ngOnInit(): void {
    this.dataUser = JSON.parse(localStorage.getItem('infoUser')!);

    console.log(this.dataUser.conductor[0].rol);
    this.UserRol = this.dataUser.conductor[0].rol
    
    
  }




}
