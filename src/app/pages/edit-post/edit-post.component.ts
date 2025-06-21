import { Component } from '@angular/core';
import { FormComponent } from '../../components/form/form.component';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { Post } from '../../Models/post';

@Component({
  selector: 'app-edit-post',
  imports: [FormComponent],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.scss',
})
export class EditPostComponent {
  post!: Post;
  isLoading: boolean = true;
  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService
  ) {
    this.getPost();
  }

  getPost() {
    const postId = this.activatedRoute.snapshot.paramMap.get('id');
    if (postId) {
      this.dataService.getPostById(postId);
      this.dataService.singlePosts$.subscribe({
        next: (post) => {
          if (post) {
            this.post = post;
          }
        },
      });
    }
  }
}
