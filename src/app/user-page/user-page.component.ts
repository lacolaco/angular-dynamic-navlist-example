import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [CommonModule],
  template: `<p>user-page works!</p>`,
})
export class UserPageComponent {}
