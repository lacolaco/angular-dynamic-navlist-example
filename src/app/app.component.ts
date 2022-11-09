import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './user.service';
import { NavListComponent } from './nav-list/nav-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavListComponent],
  template: `
    <button (click)="userService.login()">login</button>
    <button (click)="userService.logout()">logout</button>
    <button (click)="userService.makeAdmin()">make admin</button>
    <button (click)="userService.revokeAdmin()">revoke admin</button>

    <p>
      LoggedIn: {{ userService.isLoggedIn() | async }} Admin:
      {{ userService.isLoggedInAsAdmin() | async }}
    </p>
    <app-nav-list></app-nav-list>

    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  public userService = inject(UserService);
}
