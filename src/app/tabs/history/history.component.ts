
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  
})
export class HistoryComponent implements OnInit {
  quoteHistory: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getQuoteDataFromComponent();
  }

  getQuoteDataFromComponent() {
    // Replace the URL with your actual API endpoint to fetch quote data
    this.http.get('https://example.com/quote-component-api')
      .subscribe(
        (data: any) => {
          // Assuming the response contains the quote data as an array
          this.quoteHistory = data;
        },
        (error: any) => {
          console.error('Error fetching quote data:', error);
        }
      );
  }
}














