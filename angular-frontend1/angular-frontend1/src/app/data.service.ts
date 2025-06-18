import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl='https://localhost:7103/api/Authors';

  constructor(private http:HttpClient) { }

  getData(){
    return this.http.get(this.apiUrl);
  }
}
