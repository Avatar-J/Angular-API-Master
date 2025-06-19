import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: boolean = false;

  constructor() {
    localStorage.getItem('token')
      ? (this.isAuthenticated = true)
      : (this.isAuthenticated = false);
  }

  login() {
    const tokenValue: string = 'WJING-12-27-2023';
    localStorage.setItem('token', tokenValue);
    this.isAuthenticated = true;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticated = false;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
