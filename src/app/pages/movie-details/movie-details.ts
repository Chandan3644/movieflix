import { Component } from '@angular/core';
import { MovieService } from '../../core/services/movie.service';
import { ActivatedRoute } from '@angular/router';
import { FavoritesService } from '../../core/services/favorites.service';
import { CommonModule } from '@angular/common';
import { RuntimePipe } from "../../shared/pipes/runtime-pipe";

@Component({
  selector: 'app-movie-details',
  imports: [CommonModule, RuntimePipe],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css',
})
export class MovieDetails {
    
  movie: any;
  loading = true;
  error = '';
  isFavourite = false;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    const imdbId = this.route.snapshot.paramMap.get('imdbId')!;
    this.fetchMovieDetails(imdbId);
    this.isFavourite = this.favoritesService.isFavorite(imdbId);
  }

  fetchMovieDetails(imdbId: string): void {
    this.loading = true;

    this.movieService.getMovieDetails(imdbId).subscribe({
      next: (res) => {
        this.movie = res;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load movie details';
        this.loading = false;
      }
    });
  }

  toggleFavourite(): void {
    this.favoritesService.toggleFavorite(this.movie);
    this.isFavourite = this.favoritesService.isFavorite(this.movie.imdbID);
  }
}
