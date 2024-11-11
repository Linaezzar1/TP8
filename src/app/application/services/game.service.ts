import { Injectable } from '@angular/core';
import { Game } from '../model/game';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const url = "http://localhost:3000/games";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  
  constructor(private http: HttpClient) { }

  getGames(): Observable<Game[]>{
    return this.http.get<Game[]>(url);
  }

  addGame(game: Game): Observable<Game>{
    return this.http.post<Game>(url, game);
  }

}
