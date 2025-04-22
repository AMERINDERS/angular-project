import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private apiUrl = 'http://localhost:3000/api/authors';

  constructor(private http: HttpClient) {
    
   }
   //takes in a string nd adds it to the url
   getAuthorById(authorId: string): Observable<any> {
   
    return this.http.get<any>(`${this.apiUrl}/${authorId}`);
    
  }

  updateAuthor(authorId:string,authorData:any):Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/${authorId}`, authorData);
  }
  createAuthor(authorData:any):Observable <any>{
    return this.http.post<any>(this.apiUrl, authorData);
  }
  
deleteAuthor(authorId: string): Observable<any> {
  return this.http.delete<any>(`${this.apiUrl}/${authorId}`);
}
}
