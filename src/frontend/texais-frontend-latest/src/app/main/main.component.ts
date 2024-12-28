import { Component, Input, OnInit } from '@angular/core';
import { HomeComponent } from "../components/views/home/home.component";
import { FooterComponent } from "../components/footer/footer.component";
import { LockComponent } from "../components/views/lock/lock.component";
import { MergeComponent } from "../components/views/merge/merge.component";
import { SplitComponent } from "../components/views/split/split.component";
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-main',
  imports: [HomeComponent, FooterComponent, LockComponent, MergeComponent, SplitComponent, CommonModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit{
  @Input() activeItem : string = 'home';

  constructor() { }

  ngOnInit(): void {
    
  }

}
