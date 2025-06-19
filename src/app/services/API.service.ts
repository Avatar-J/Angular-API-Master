import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Post } from '../Models/post';
import {
  BehaviorSubject,
  catchError,
  Observable,
  retry,
  throwError,
} from 'rxjs';
import { Comment } from '../Models/Comment';
import { ErrorHandler } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  endpoint = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient, private errorHandler: ErrorHandler) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.endpoint}/posts`).pipe(
      retry(3),
      catchError((err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
        return throwError(() => err);
      })
    );
  }

  getSinglePost(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.endpoint}/posts/${id}`).pipe(
      retry(3),
      catchError((err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
        return throwError(() => err);
      })
    );
  }

  getComments(id: string): Observable<Comment[]> {
    return this.http
      .get<Comment[]>(`${this.endpoint}/posts/${id}/comments`)
      .pipe(
        retry(3),
        catchError((err: HttpErrorResponse) => {
          this.errorHandler.handleError(err);
          return throwError(() => err);
        })
      );
  }
  deletePost(id: string): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/posts/${id}`).pipe(
      retry(3),
      catchError((err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
        return throwError(() => err);
      })
    );
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.endpoint}/posts`, post).pipe(
      retry(3),
      catchError((err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
        return throwError(() => err);
      })
    );
  }
}
