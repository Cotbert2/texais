import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [ CommonModule],
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
    setInterval(() => {
      this.isShow = false;
      setTimeout(() => {
        this.wordIndex = (this.wordIndex + 1) % this.setOfWord.length;
        this.currentWord = this.setOfWord[this.wordIndex];
        this.isShow = true; 
      }, 1000); 
    }, 3000); 
  }

}
