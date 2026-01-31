import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MovieService } from '../../core/services/movie.service';
import { switchMap } from 'rxjs';
import { EMPTY } from 'rxjs';
import { MovieCard } from "../../shared/components/movie-card/movie-card";
import { CommonModule } from '@angular/common';
import { Header } from "../../shared/components/header/header";
import { Loader } from "../../shared/components/loader/loader";

@Component({
  selector: 'app-search',
  imports: [MovieCard, CommonModule, Header, Loader,RouterModule ],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {

  movies: any[] = [];
  query = '';
  page = 1;
  totalResults = 0;

  loading = false;
  error = '';
  recentSearches: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.loadRecentSearches();

    this.route.queryParams
      .pipe(
        switchMap(params => {
          this.query = params['query'] || '';
          this.page = 1;

          if (!this.query) {
            this.movies = [];
            return EMPTY;
          }

          this.saveRecentSearch(this.query);

          this.loading = true;
          this.error = '';

          return this.movieService.searchMoveis(this.query, this.page);
        })
      )
      .subscribe({
        next: (res: any) => {
          if (res?.Response === 'False') {
            this.movies = [];
            this.totalResults = 0;
            this.error = res.Error || 'No results found';
          } else {
            this.movies = res.Search || [];
            this.totalResults = +res.totalResults || 0;
          }
          this.loading = false;
        },
        error: () => {
          this.loading = false;
          this.error = 'Something went wrong. Please try again.';
        }
      });
  }

  loadMore(): void {
    this.page++;
    this.loading = true;

    this.movieService.searchMoveis(this.query, this.page)
      .subscribe((res: any) => {
        this.movies = [...this.movies, ...(res.Search || [])];
        this.loading = false;
      });
  }

  get canLoadMore(): boolean {
    return this.movies.length < this.totalResults;
  }


  saveRecentSearch(query: string) {
    let searches = JSON.parse(
      localStorage.getItem('recentSearches') || '[]'
    );

    searches = searches.filter((s: string) => s !== query);
    searches.unshift(query);

    if (searches.length > 5) searches.pop();

    localStorage.setItem('recentSearches', JSON.stringify(searches));
    this.recentSearches = searches;
  }

  loadRecentSearches() {
    this.recentSearches = JSON.parse(
      localStorage.getItem('recentSearches') || '[]'
    );
  }
}
