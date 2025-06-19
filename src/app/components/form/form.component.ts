import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Post } from '../../Models/post';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    //  this.router.navigate(['/view', this.]);
  }
  onSubmit() {}
}
