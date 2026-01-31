import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MovieService {

  private baseUrl  = 'https://www.omdbapi.com/';

  constructor(private http:HttpClient){}

  searchMoveis(query: string, page = 1){
    return this.http.get<any>(this.baseUrl,{
      params: {s:query, page, type:'movie'}

    })
  }

  getMovieDetails(imdbId:string){
    return this.http.get<any>(this.baseUrl,{
      params:{i:imdbId, plot:'full'}
    })
  }

   getMovieDetailsByTitle(title: string, year?: number) {
    return this.http.get<any>(this.baseUrl, {
      params: {
        t: title,
        ...(year && { y: year }),
        plot: 'full',
      },
    });
  }
  
}

