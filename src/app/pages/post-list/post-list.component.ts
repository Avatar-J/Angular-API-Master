import { Component, inject, OnInit } from '@angular/core';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import { APIService } from '../../services/API.service';
import { Post } from '../../Models/post';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-post-list',
  imports: [PostCardComponent, LoaderComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent implements OnInit {
  APIService = inject(APIService);
  postList!: Post[];
  isloading: boolean = true;

  ngOnInit(): void {
    this.APIService.getPosts().subscribe({
      next: (posts) => {
        this.postList = posts;
      },
      complete: () => {
        this.isloading = false;
      },
    });
  }
}
