import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  @Input({ required: true })
  purpose!: string;

  private router = inject(Router);
  bodyChar: number = 0;

  onCancel() {
    //  this.router.navigate(['/view', this.]);
  }
  onSubmit() {}
}
