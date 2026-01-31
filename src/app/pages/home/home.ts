import { Component } from '@angular/core';
import { Header } from "../../shared/components/header/header";
import { MovieList } from "../../shared/components/movie-list/movie-list";
import { MovieService } from '../../core/services/movie.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [Header, MovieList],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {


  actionMovies: any[] = [];
  dramaMovies: any[] = [];
  comedyMovies: any[] = [];
  thrillerMovies: any[] = [];

  loading = true;
  error = '';

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadHomeMovies();
  }

  loadHomeMovies(): void {
    this.loading = true;

    forkJoin({
      action: this.movieService.searchMoveis('action'),
      drama: this.movieService.searchMoveis('drama'),
      comedy: this.movieService.searchMoveis('comedy'),
      thriller: this.movieService.searchMoveis('thriller'),
    }).subscribe({
      next: (response) => {
        this.actionMovies = response.action?.Search || [];
        this.dramaMovies = response.drama?.Search || [];
        this.comedyMovies = response.comedy?.Search || [];
        this.thrillerMovies = response.thriller?.Search || [];
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load movies. Please try again later.';
        this.loading = false;
      }
    });
  }
}



  


