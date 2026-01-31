import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl,ReactiveFormsModule    } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar {


  searchControl = new FormControl('');

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((value: string | null) => {
        if (value && value.length > 2) {
          this.router.navigate(['/search'], {
            queryParams: { query: value }
          });
        }
      });
  }

  clearSearch() {
    this.searchControl.setValue('');
    this.router.navigate(['/home']);
  }


}
