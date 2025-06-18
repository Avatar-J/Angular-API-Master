import { Component, Input } from '@angular/core';
import { Post } from '../../Models/post';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-post-card',
  imports: [RouterModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
})
export class PostCardComponent {
  @Input({ required: true }) post!: Post;
}
