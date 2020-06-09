import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../Hero';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;

  constructor(
    private route: ActivatedRoute,  // The ActivatedRoute holds information about the route to this instance of the HeroDetailComponent.
    private heroService: HeroService,  // The HeroService gets hero data from the remote server and this component will use it to get the hero-to-display.
    private location: Location,  // The location is an Angular service for interacting with the browser. You'll use it to navigate back to the view that navigated here.
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
  }
}
