import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {
  private baseUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) {}

  getProfessors(): Observable<any> {
    return this.http.get(`${this.baseUrl}/professors`);
  }

  createProfessor(professor: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/professors`, professor);
  }

  updateProfessor(id: string, professor: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/professors/${id}`, professor);
  }

  deleteProfessor(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/professors/${id}`);
  }
}