import { Routes } from '@angular/router';
import { PostListComponent } from './pages/post-list/post-list.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';

export const routes: Routes = [
  {
    path: '',
    component: PostListComponent,
    pathMatch: 'full',
  },
  {
    path: 'create',
    component: CreatePostComponent,
  },
];
