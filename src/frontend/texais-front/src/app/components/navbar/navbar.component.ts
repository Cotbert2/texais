import { Component, EventEmitter, OnInit, Output } from '@angular/core';
//import prime ng
import { CommonModule } from '@angular/common';
import { PanelMenuModule } from 'primeng/panelmenu';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { MenuModule } from 'primeng/menu'; 
import {AvatarModule} from 'primeng/avatar';

@Component({
  selector: 'app-navbar',
  imports: [
    ButtonModule,
    InputTextModule,
    PanelMenuModule,
    CommonModule,
    BadgeModule,
    MenuModule,
    AvatarModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  @Output() activateItem = new EventEmitter<string>();
  activeItem : string = 'home';

  constructor() { }

  ngOnInit(): void {
    this.activateItem.emit(this.activeItem);
  }

  changeActiveTabService(service : string ) : void {
    this.activeItem = service;
    this.activateItem.emit(service);
  }
}