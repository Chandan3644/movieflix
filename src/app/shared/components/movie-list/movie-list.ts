import { Component, Input } from '@angular/core';
import { MovieCard } from '../movie-card/movie-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-list',
  imports: [ CommonModule,MovieCard],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
})
export class MovieList {

  @Input() title: string = '';
  @Input() movies: any[] = [];

}
