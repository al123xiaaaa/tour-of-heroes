import { Component, OnInit } from '@angular/core';
import { Hero } from '../Hero';
import { HEROES } from '../mock-heores';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heros = HEROES;
  selectedHero: Hero;

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }
}