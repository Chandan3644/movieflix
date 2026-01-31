import { Component } from '@angular/core';
import { FavoritesService } from '../../core/services/favorites.service';
import { Router } from '@angular/router';
import { MovieCard } from "../../shared/components/movie-card/movie-card";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorites',
  imports: [MovieCard,CommonModule],
  templateUrl: './favorites.html',
  styleUrl: './favorites.css',
})
export class Favorites {

  
  favorites: any[] = [];

  constructor(
    private favoritesService: FavoritesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.favorites = this.favoritesService.getFavorites();
  }

  remove(imdbId: string): void {
    this.favoritesService.removeFromFavorites(imdbId);
    this.loadFavorites();
  }

  goToDetails(imdbId: string): void {
    this.router.navigate(['/movie', imdbId]);
  }

}
