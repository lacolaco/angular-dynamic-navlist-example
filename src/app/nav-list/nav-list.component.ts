import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NavList } from './nav-list';

@Component({
  selector: 'app-nav-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <ul>
      <li *ngFor="let item of navListItems$ | async">
        <a [routerLink]="[item.path]">{{ item.navListItem.label }}</a>
      </li>
    </ul>
  `,
})
export class NavListComponent {
  private readonly router = inject(Router);
  private readonly navigationService = inject(NavList);
  navListItems$ = this.navigationService.fromRoutes(this.router.config);
}
