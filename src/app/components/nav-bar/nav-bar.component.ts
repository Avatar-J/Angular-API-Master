import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  router = inject(Router);

  constructor(public authService: AuthService) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  login(): void {
    this.authService.login();
  }
}
