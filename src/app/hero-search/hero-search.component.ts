import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
import { Hero } from '../Hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  // The $ is a convention that indicates heroes$ is an Observable, not an array.
  heroes$: Observable<Hero[]>;
  // A Subject is both a source of observable values and an Observable itself. You can subscribe to a Subject as you would any Observable.
  private searchTerms = new Subject<string>();

  constructor(
    private heroServie: HeroService
  ) { }

  ngOnInit(): void {
    // The searchTerms becomes an Observable emitting a steady stream of search terms.
    this.heroes$ = this.searchTerms.pipe(
      // Chaining RxJS operators (follow)

      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.heroServie.searchHeroes(term))
    );
  }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
}
