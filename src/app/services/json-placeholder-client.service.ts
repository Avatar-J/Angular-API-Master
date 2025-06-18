import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../Models/post';
import { Observable } from 'rxjs';
import { Comment } from '../Models/Comment';

@Injectable({
  providedIn: 'root',
})
export class JsonPlaceholderClientService {
  endpoint = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.endpoint}/posts`);
  }

  getSinglePost(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.endpoint}/posts/${id}`);
  }

  getComments(id: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.endpoint}/posts/${id}/comments`);
  }
}
