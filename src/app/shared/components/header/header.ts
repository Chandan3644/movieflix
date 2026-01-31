import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchBar } from '../search-bar/search-bar';

@Component({
  selector: 'app-header',
  imports: [SearchBar],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {

  constructor(private router: Router) {}

goHome() {
  this.router.navigate(['/home']);
}

goToFavorites() {
  this.router.navigate(['/favorites']);
}


}
