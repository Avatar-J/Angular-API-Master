import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  constructor(private toast: ToastService) {}

  handle(error: HttpErrorResponse): void {
    let message = 'An unexpected error occurred.';

    if (error.status === 0) {
      message = 'Network error. Please check your connection.';
    } else if (error.status === 404) {
      message = 'Requested resource not found.';
    } else if (error.status === 500) {
      message = 'Server is down.';
    } else if (error.status === 401 || error.status === 403) {
      message = 'Unauthorized. Please log in again.';
    } else if (typeof error.error === 'string') {
      message = error.error;
    }
    this.toast.show(message, 'error');
  }
}
