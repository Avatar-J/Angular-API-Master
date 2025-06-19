import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  constructor(private http: HttpClient) {}

  get<T>(url: string, timeout: number = 1000 * 60): Observable<T> {
    const cacheKey = `cache_${url}`;
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      const { value, expiry } = JSON.parse(cachedData);
      if (Date.now() < expiry) {
        return of(value as T);
      } else {
        localStorage.removeItem(cacheKey);
      }
    }

    return this.http.get<T>(url).pipe(
      tap((data) => {
        localStorage.setItem(
          cacheKey,
          JSON.stringify({ value: data, expiry: Date.now() + timeout })
        );
      })
    );
  }

  clearCache(url: string): void {
    const cacheKey = `cache_${url}`;
    localStorage.removeItem(cacheKey);
  }
}
