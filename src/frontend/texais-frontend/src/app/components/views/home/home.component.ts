import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent  implements OnInit{
  setOfWord : string[] = ['TexAIs', 'Freedom', 'Innovation', 'Simplicity', 'Security',];
  currentWord : string = this.setOfWord[0];

  isShow : boolean = true;
  wordIndex : number = 0;

  constructor() { }

  ngOnInit(): void {
    console.log('home component loaded');
  }

}
