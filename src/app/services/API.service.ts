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
import { environment } from '../../environments/environment';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root',
})
export class APIService {
  endpoint = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandler,
    private cacheService: CacheService
  ) {}

  getPosts(): Observable<Post[]> {
    return this.cacheService.get<Post[]>(`${this.endpoint}/posts`).pipe(
      retry(3),
      catchError((err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
        return throwError(() => err);
      })
    );
  }

  getSinglePost(id: string): Observable<Post> {
    return this.cacheService.get<Post>(`${this.endpoint}/posts/${id}`).pipe(
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

  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.endpoint}/posts`, post).pipe(
      retry(3),
      catchError((err: HttpErrorResponse) => {
        this.errorHandler.handleError(err);
        return throwError(() => err);
      })
    );
  }
}
