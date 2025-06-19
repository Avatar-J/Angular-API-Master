import { Component, inject, OnInit } from '@angular/core';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import { JsonPlaceholderClientService } from '../../services/json-placeholder-client.service';
import { Post } from '../../Models/post';

@Component({
  selector: 'app-post-list',
  imports: [PostCardComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent implements OnInit {
  JsonPlaceHolder = inject(JsonPlaceholderClientService);
  postList: Post[] = [];

  ngOnInit(): void {
    this.JsonPlaceHolder.getPosts().subscribe({
      next: (posts) => {
        this.postList = posts;
      },
    });
  }
}
