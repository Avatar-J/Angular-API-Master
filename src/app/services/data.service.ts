import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Post } from '../Models/post';
import { APIService } from './API.service';
import { ErrorService } from './error.service';
import { Comment } from '../Models/Comment';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private postsSubject = new BehaviorSubject<Post[]>([]);
  public posts$ = this.postsSubject.asObservable();

  private singlePostSubject = new BehaviorSubject<Post | null>(null);
  public singlePosts$ = this.singlePostSubject.asObservable();

  private commentsSubject = new BehaviorSubject<Comment[]>([]);
  public comments$ = this.commentsSubject.asObservable();

  constructor(
    private apiService: APIService,
    private errorService: ErrorService
  ) {
    this.loadPosts();
  }

  loadPosts(): void {
    this.apiService.getPosts().subscribe({
      next: (posts: Post[]) => {
        this.postsSubject.next(posts);
      },
      error: (error) => {
        this.errorService.handle(error);
      },
    });
  }

  deletePost(id: string): void {
    this.apiService.deletePost(id.toString()).subscribe({
      next: () => {
        const updatedPosts = this.postsSubject
          .getValue()
          .filter((post) => post.id.toString() !== id);
        this.postsSubject.next(updatedPosts);
      },
      error: (error) => {
        this.errorService.handle(error);
      },
    });
  }

  getPostById(id: string): void {
    this.apiService.getSinglePost(id.toString()).subscribe({
      next: (post: Post) => {
        this.singlePostSubject.next(post);
      },
      error: (apiError) => {
        const localPost = this.postsSubject
          .getValue()
          .find((post) => post.id.toString() === id);

        if (localPost) {
          this.singlePostSubject.next(localPost);
        } else {
          this.errorService.handle(apiError);
        }
      },
    });
    this.apiService.getComments(id.toString()).subscribe({
      next: (comments) => {
        this.commentsSubject.next(comments);
      },
      error: (error) => {
        this.commentsSubject.next([]);
      },
    });
  }

  createPost(post: Post): void {
    this.apiService.createPost(post).subscribe({
      next: () => {
        const updatedPosts = [post, ...this.postsSubject.getValue()];
        this.postsSubject.next(updatedPosts);
      },
      error: (error) => {
        this.errorService.handle(error);
      },
    });
  }

  editPost(post: Post): void {
    this.apiService.updatePost(post).subscribe({
      next: () => {
        const updatedPosts = this.postsSubject
          .getValue()
          .map((p) => (p.id === post.id ? post : p));
        this.postsSubject.next(updatedPosts);
      },
      error: (error) => {
        this.errorService.handle(error);
      },
    });
  }
}
