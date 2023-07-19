import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tabs-history-page',
  templateUrl: './history.component.html',
})
export class HistoryComponent implements OnInit {
  historyData: any[];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getHistoryData();
  }

  getHistoryData() {
    // Replace the URL with the new endpoint for fetching quote history
    const userId = "1000"; // Replace with the actual user ID
    this.http.get('http://127.0.0.1:1234/quote-history/' + userId)
      .subscribe(
        (data: any[]) => {
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
