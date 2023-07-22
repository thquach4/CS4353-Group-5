import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { QuoteHistoryService } from '../quote/quote-history.service';

@Component({
  selector: 'tabs-history-page',
  templateUrl: './history.component.html',
})
export class HistoryComponent implements OnInit {
  historyData: any[];
  userId: string;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private quoteHistoryService: QuoteHistoryService
  ) {}

  ngOnInit(): void {
    // Fetch the user ID from query parameters
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
      this.getHistoryData();
    });
  }

  getHistoryData() {
    // Retrieve the history data from the QuoteHistoryService
    this.quoteHistoryService.getQuoteHistory(this.userId).subscribe(
      (data: any) => {
        console.log('Received history data.');
        console.log(data);
        // Store the history data or perform any required operations
        this.historyData = data;
      },
      (error: any) => {
        console.log('Error fetching history data.');
        console.error(error);
        // Handle the error if needed
      }
    );
  }
}
