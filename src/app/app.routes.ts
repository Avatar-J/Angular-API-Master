import { Routes } from '@angular/router';
import { PostListComponent } from './pages/post-list/post-list.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { ViewPostComponent } from './pages/view-post/view-post.component';
import { protectedRoutesGuard } from './guards/protected-routes.guard';

export const routes: Routes = [
  {
    path: '',
    component: PostListComponent,
    pathMatch: 'full',
  },
  {
    path: 'create',
    component: CreatePostComponent,
    canActivate: [protectedRoutesGuard],
  },
  {
    path: 'view/:id',
    component: ViewPostComponent,
  },
];
