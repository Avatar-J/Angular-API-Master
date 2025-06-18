import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JsonPlaceholderClientService } from '../../services/json-placeholder-client.service';
import { Post } from '../../Models/post';
import { Comment } from '../../Models/Comment';

@Component({
  selector: 'app-view-post',
  imports: [],
  templateUrl: './view-post.component.html',
  styleUrl: './view-post.component.scss',
})
export class ViewPostComponent implements OnInit {
  router = inject(ActivatedRoute);
  JsonPlaceholder = inject(JsonPlaceholderClientService);
  post!: Post;
  comments!: Comment[];

  ngOnInit(): void {
    const id = this.router.snapshot.paramMap.get('id');

    if (id) {
      this.JsonPlaceholder.getSinglePost(id).subscribe({
        next: (post) => {
          this.post = post;
        },
      });

      this.JsonPlaceholder.getComments(id).subscribe({
        next: (comments) => {
          this.comments = comments;
        },
      });
    }
  }
}
