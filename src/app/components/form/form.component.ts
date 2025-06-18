import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from '../../Models/post';

@Component({
  selector: 'app-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  @Input({ required: true })
  purpose: 'create' | 'edit' = 'create';

  @Input() post?: Post;

  private router = inject(Router);
  bodyChar: number = 0;
  title!: string;
  body!: string;

  ngOnInit(): void {
    if (this.purpose === 'edit' && this.post) {
      this.title = this.post.title;
      this.body = this.post.body;
    }
  }

  onCancel() {
    //  this.router.navigate(['/view', this.]);
  }
  onSubmit() {}
}
