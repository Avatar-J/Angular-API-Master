import { Component, Input } from '@angular/core';
import { Post } from '../../Models/post';

@Component({
  selector: 'app-post-card',
  imports: [],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
})
export class PostCardComponent {
  @Input({ required: true }) post!: Post;
}
