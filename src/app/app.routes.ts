import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Search } from './pages/search/search';
import { MovieDetails } from './pages/movie-details/movie-details';
import { Genre } from './pages/genre/genre';
import { Favorites } from './pages/favorites/favorites';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'search', component: Search },
  { path: 'movie/:imdbId', component: MovieDetails },
  { path: 'favorites', component: Favorites },
  { path: 'genre/:genreName', component: Genre },
];

