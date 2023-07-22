import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class QuoteHistoryService {
  constructor(private http: HttpClient) {}

  getQuoteHistory(userId: string) {
    // Fetch the history data from the server based on the user ID
    return this.http.get<any[]>(`http://127.0.0.1:1234/get/history/${userId}`);
  }
}
