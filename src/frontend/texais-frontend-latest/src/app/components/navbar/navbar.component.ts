import { Component, EventEmitter, OnInit, Output } from '@angular/core';
//import prime ng
import { CommonModule } from '@angular/common';
import { PanelMenuModule } from 'primeng/panelmenu';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { MenuModule } from 'primeng/menu'; 
import {AvatarModule} from 'primeng/avatar';
import { DialogModule } from 'primeng/dialog';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    PanelMenuModule,
    CommonModule,
    BadgeModule,
    MenuModule,
    AvatarModule,
    DialogModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  @Output() activateItem = new EventEmitter<string>();
  activeItem : string = 'home';

  showInfoDialog: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.activateItem.emit(this.activeItem);
  }

  changeActiveTabService(service : string ) : void {
    this.activeItem = service;
    this.activateItem.emit(service);
  }

  showDialog() {
    this.showInfoDialog = true;
  }
}