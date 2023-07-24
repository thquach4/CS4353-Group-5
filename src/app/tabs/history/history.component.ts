import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { UserIdService } from '../../shared/user-id.service';

@Component({
  selector: 'tabs-history-page',
  templateUrl: './history.component.html',
})
export class HistoryComponent implements OnInit {
  historyData: any[];
  userId: string; // Define userId here

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute, // Add ActivatedRoute to the constructor
    private userIdService: UserIdService
  ) {}


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userId = params.get('userId');
      this.getHistoryData();
    });
  }  

  getHistoryData() {
    if (this.userId) {
      this.http.get(`http://127.0.0.1:1234/get/history/${this.userId}`)
        .subscribe(
          (data: any) => {
            console.log('Received history data:', data);
            // Store the history data or perform any required operations
            this.historyData = data.history;
          },
          (error: any) => {
            console.log('Error fetching history data.');
            console.error(error);
            // Handle the error if needed
          }
        );
    } else {
      console.log('User ID is not available.');
    }
  }   
}
