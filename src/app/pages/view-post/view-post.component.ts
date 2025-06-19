import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIService } from '../../services/API.service';
import { Post } from '../../Models/post';
import { Comment } from '../../Models/Comment';
import { ModalComponent } from '../../components/modal/modal.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-view-post',
  imports: [ModalComponent, LoaderComponent],
  templateUrl: './view-post.component.html',
  styleUrl: './view-post.component.scss',
})
export class ViewPostComponent implements OnInit {
  router = inject(ActivatedRoute);
  APIService = inject(APIService);
  dataService = inject(DataService);

  post!: Post;
  comments!: Comment[] | null;
  showModal: boolean = false;
  isLoading: boolean = true;
  commentLength!: number;

  ngOnInit(): void {
    const id = this.router.snapshot.paramMap.get('id');

    if (id) {
      this.dataService.getPostById(id);
      this.dataService.singlePosts$.subscribe({
        next: (post) => {
          if (post) {
            this.post = post;

            setTimeout(() => {
              this.isLoading = false;
            }, 200);
          }
        },
      });
      this.dataService.comments$.subscribe({
        next: (comments) => {
          this.comments = comments;
          this.commentLength = comments.length;
        },
      });

      // this.APIService.getComments(id).subscribe({
      //   next: (comments) => {
      //     this.comments = comments;
      //   },
      //   complete: () => {
      //     this.commentLength = this.comments.length;
      //   },
      // });
    }
  }

  onToggleModal() {
    this.showModal = !this.showModal;
  }
}
