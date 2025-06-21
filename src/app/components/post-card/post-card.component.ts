import { Component, Input, inject } from '@angular/core';
import { Post } from '../../Models/post';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ModalComponent } from '../modal/modal.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-card',
  imports: [RouterModule, ModalComponent],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
})
export class PostCardComponent {
  @Input({ required: true }) post!: Post;

  isModalActive: boolean = false;

  router = inject(Router);

  constructor(
    public authService: AuthService,
    private activatedroute: ActivatedRoute
  ) {}

  onEdit() {
    this.router.navigate(['/edit', this.post.id]);
  }
  onDelete() {
    this.toggleModal();
  }

  toggleModal() {
    this.isModalActive = !this.isModalActive;
  }
}
