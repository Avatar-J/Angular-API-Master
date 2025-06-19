import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from '../../Models/post';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-form',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements OnInit {
  @Input() post?: Post;

  private router = inject(Router);
  formBuilder = inject(FormBuilder);
  dataService = inject(DataService);
  toastService = inject(ToastService);

  form!: FormGroup;

  bodyChar: number = 0;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: [
        this.post?.title || '',
        [Validators.required, Validators.minLength(5)],
      ],
      body: [
        this.post?.body || '',
        [Validators.required, Validators.maxLength(1000)],
      ],
    });
  }

  onCancel() {
    this.router.navigate(['']);
  }
  onSubmit() {
    if (this.form.valid) {
      const newPost: Post = {
        userId: 1,
        id: Math.floor(Math.random() * 1000) + 1,
        title: this.form.value.title,
        body: this.form.value.body,
      };

      if (this.post) {
        // this.dataService.updatePost(post);
      } else {
        this.dataService.createPost(newPost);
        this.toastService.show('Created new post successfully', 'success');

        setTimeout(() => {
          this.router.navigate(['view', newPost.id]);
        }, 2000);
      }
    }
  }
}
