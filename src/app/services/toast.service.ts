import { Injectable } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  public message: string | null = null;
  public type: ToastType = 'info';

  show(msg: string, type: ToastType = 'info') {
    this.message = msg;
    this.type = type;

    setTimeout(() => {
      this.message = null;
    }, 3000);
  }
}
