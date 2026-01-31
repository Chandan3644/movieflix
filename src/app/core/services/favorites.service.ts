import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  
    private storageKey = 'favorite_movies';

  getFavorites(): any[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  isFavorite(imdbId: string): boolean {
    return this.getFavorites().some(movie => movie.imdbID === imdbId);
  }

  addToFavorites(movie: any): void {
    const favorites = this.getFavorites();

    if (!favorites.some(m => m.imdbID === movie.imdbID)) {
      favorites.push({
        imdbID: movie.imdbID,
        Title: movie.Title,
        Poster: movie.Poster,
        Year: movie.Year,
        Type: movie.Type,
      });

      localStorage.setItem(this.storageKey, JSON.stringify(favorites));
    }
  }

  removeFromFavorites(imdbId: string): void {
    const updated = this.getFavorites().filter(
      movie => movie.imdbID !== imdbId
    );
    localStorage.setItem(this.storageKey, JSON.stringify(updated));
  }

  toggleFavorite(movie: any): void {
    this.isFavorite(movie.imdbID)
      ? this.removeFromFavorites(movie.imdbID)
      : this.addToFavorites(movie);
  }
}
