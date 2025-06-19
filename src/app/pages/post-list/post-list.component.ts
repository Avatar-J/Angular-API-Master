import { Component, inject, OnInit } from '@angular/core';
import { PostCardComponent } from '../../components/post-card/post-card.component';
import { APIService } from '../../services/API.service';
import { Post } from '../../Models/post';
import { LoaderComponent } from '../../components/loader/loader.component';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-post-list',
  imports: [PostCardComponent, LoaderComponent],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.scss',
})
export class PostListComponent implements OnInit {
  APIService = inject(APIService);
  dataService = inject(DataService);
  postList!: Post[];
  isloading: boolean = true;

  ngOnInit(): void {
    this.dataService.posts$.subscribe({
      next: (posts) => {
        this.postList = posts;

        setTimeout(() => {
          this.isloading = false;
        }, 1000);
      },
      error: (error) => {
        this.isloading = false;
      },
    });
  }
}
