import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employe } from '../model/employe';

const url = "http://localhost:4000/employes";

@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  constructor (private http: HttpClient) { }
  employes: Employe[] = [];
  getEmployes(): Observable<Employe[]>{
    return this.http.get<Employe[]>(url);
  }

  addEmploye(employe: Employe): Observable<Employe>{
    return this.http.post<Employe>(url, employe);
  }

}
