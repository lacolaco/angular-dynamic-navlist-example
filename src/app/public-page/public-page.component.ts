import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-public-page',
  standalone: true,
  imports: [CommonModule],
  template: `<p>public-page works!</p>`,
})
export class PublicPageComponent {}
