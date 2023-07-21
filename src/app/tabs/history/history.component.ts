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
  userId: string;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Fetch the user ID from route parameters
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId');
      this.getHistoryData();
    });
  }


  getHistoryData() {
    
    
    this.http.get('http://127.0.0.1:1234/quote-history/' + this.userId)
      .subscribe(
        (data: any) => {
          console.log('Received history data.');
          console.log(data);
          // Store the history data or perform any required operations
          this.historyData = data.history;
        },
        (error: any) => {
          console.log('Error fetching history data.');
          console.error(error);
          // Handle the error if needed
        }
      );
  }
}
