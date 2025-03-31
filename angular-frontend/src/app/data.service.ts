import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Replace with your actual API URL
  private apiUrl = 'your-api-url';

  constructor(private http: HttpClient) {}

  getAuthors(): Observable<any[]> {
    // Check that this endpoint returns an array of authors
    return this.http.get<any[]>(`${this.apiUrl}/authors`);
  }
}
