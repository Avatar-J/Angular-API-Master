import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  constructor(public toastService: ToastService) {}

  dismiss() {
    this.toastService.message = null;
  }
}
