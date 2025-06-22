import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { APIService } from './API.service';
import { ErrorHandler } from '@angular/core';
import { CacheService } from './cache.service';
import { environment } from '../../environments/environment';
import { Post } from '../Models/post';
import { Comment } from '../Models/Comment';

describe('APIService', () => {
  let service: APIService;
  let httpMock: HttpTestingController;
  let cacheServiceSpy: jasmine.SpyObj<CacheService>;
  let errorHandlerSpy: jasmine.SpyObj<ErrorHandler>;

  const endpoint = environment.apiUrl;

  beforeEach(() => {
    cacheServiceSpy = jasmine.createSpyObj('CacheService', ['get']);
    errorHandlerSpy = jasmine.createSpyObj('ErrorHandler', ['handleError']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        APIService,
        { provide: CacheService, useValue: cacheServiceSpy },
        { provide: ErrorHandler, useValue: errorHandlerSpy },
      ],
    });

    service = TestBed.inject(APIService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPosts', () => {
    it('should call CacheService.get with the correct URL and return posts', () => {
      const mockPosts: Post[] = [{ id: '1', title: 'Test Post', body: 'Lorem', userId: '123' }];
      cacheServiceSpy.get.and.returnValue(of(mockPosts));

      service.getPosts().subscribe(posts => {
        expect(posts).toEqual(mockPosts);
        expect(cacheServiceSpy.get).toHaveBeenCalledWith(`${endpoint}/posts`);
      });
    });

    it('should call handleError on error in getPosts', () => {
      const errorResponse = new ErrorEvent('Network error');
      cacheServiceSpy.get.and.returnValue(throwError(() => new HttpErrorResponse({ error: errorResponse, status: 500 })));

      service.getPosts().subscribe({
        error: () => {
          expect(errorHandlerSpy.handleError).toHaveBeenCalled();
        },
      });
    });
  });

  describe('getSinglePost', () => {
    it('should call CacheService.get with post id', () => {
      const post: Post = { id: '1', title: 'One', body: 'Body', userId: '123' };
      cacheServiceSpy.get.and.returnValue(of(post));

      service.getSinglePost('1').subscribe(result => {
        expect(result).toEqual(post);
        expect(cacheServiceSpy.get).toHaveBeenCalledWith(`${endpoint}/posts/1`);
      });
    });
  });

  describe('getComments', () => {
    it('should make a GET request and return comments', () => {
      const mockComments: Comment[] = [{ id: '1', body: 'Nice post!', postId: '1', email: 'a@b.com', name: 'User' }];

      service.getComments('1').subscribe(comments => {
        expect(comments).toEqual(mockComments);
      });

      const req = httpMock.expectOne(`${endpoint}/posts/1/comments`);
      expect(req.request.method).toBe('GET');
      req.flush(mockComments);
    });
  });

  describe('deletePost', () => {
    it('should make a DELETE request', () => {
      service.deletePost('1').subscribe(response => {
        expect(response).toBeUndefined();
      });

      const req = httpMock.expectOne(`${endpoint}/posts/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });

  describe('createPost', () => {
    it('should make a POST request and return created post', () => {
      const post: Post = { id: '2', title: 'New', body: 'Text', userId: '456' };

      service.createPost(post).subscribe(result => {
        expect(result).toEqual(post);
      });

      const req = httpMock.expectOne(`${endpoint}/posts`);
      expect(req.request.method).toBe('POST');
      req.flush(post);
    });
  });

  describe('updatePost', () => {
    it('should make a PUT request and return updated post', () => {
      const updatedPost: Post = { id: '2', title: 'Updated', body: 'Changed', userId: '789' };

      service.updatePost(updatedPost).subscribe(result => {
        expect(result).toEqual(updatedPost);
      });

      const req = httpMock.expectOne(`${endpoint}/posts`);
      expect(req.request.method).toBe('PUT');
      req.flush(updatedPost);
    });
  });
});
