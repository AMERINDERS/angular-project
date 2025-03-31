import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-data-display',
  templateUrl: './data-display.component.html',
  styleUrls: ['./data-display.component.css']
})
export class DataDisplayComponent implements OnInit {
  data: any[] = [];
  loading = true;
  error = false;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe({
      next: (authors: any) => {
        this.data = authors;
        this.loading = false;
        console.log('Authors loaded:', authors); // For debugging
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error loading authors:', err);
        this.error = true;
        this.loading = false;
      }
    });
  }
}