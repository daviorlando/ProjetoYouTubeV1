import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})

export class VideosService {
  private baseUrl = 'http://localhost:3000/videos';

  constructor(private http: HttpClient) { }

  getVideos() {
    return this.http.get('http://localhost:3000/videos')
  }
  updateVideo(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data);
  }
}

