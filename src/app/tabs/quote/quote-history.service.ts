import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuoteHistoryService {

  private apiUrl = 'http://localhost:5000/api'; // Update the URL to match your backend API

  constructor(private http: HttpClient) { }

  getQuotes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/quotes`);
  }
}
