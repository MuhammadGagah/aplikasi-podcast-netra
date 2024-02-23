import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RssService {
  constructor(private http: HttpClient) {}

  // Modify the method to accept a URL argument
  getRssFeed(url: string): Observable<string> {
    return this.http.get(url, { responseType: 'text' });
  }
}
