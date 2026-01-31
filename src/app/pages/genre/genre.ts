import { Component } from '@angular/core';
import { MovieCard } from "../../shared/components/movie-card/movie-card";
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../core/services/movie.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-genre',
  imports: [MovieCard,CommonModule],
  templateUrl: './genre.html',
  styleUrl: './genre.css',
})
export class Genre {
 genre = '';
  movies: any[] = [];
  page = 1;
  loading = false;
  error = '';
  totalResults = 0;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.genre = params.get('genreName')!;
      this.page = 1;
      this.movies = [];
      this.loadMovies();
    });
  }

  loadMovies(): void {
    this.loading = true;

    this.movieService.searchMoveis(this.genre, this.page).subscribe({
      next: res => {
        if (res.Response === 'True') {
          this.movies.push(...res.Search);
          this.totalResults = +res.totalResults;
        } else {
          this.error = res.Error;
        }
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load movies';
        this.loading = false;
      }
    });
  }

  loadMore(): void {
    this.page++;
    this.loadMovies();
  }
}
