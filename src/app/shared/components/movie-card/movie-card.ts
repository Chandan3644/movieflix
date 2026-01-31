import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  imports: [CommonModule],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css',
})
export class MovieCard {

   @Input() movie: any;
  @Input() showRemove = false;

  @Output() remove = new EventEmitter<void>();

  constructor(private router: Router) {}

  goToDetails(): void {
    if (this.movie?.imdbID) {
      this.router.navigate(['/movie', this.movie.imdbID]);
    }
  }

  removeMovie(event: Event): void {
    event.stopPropagation(); 
    this.remove.emit();
  }

}
