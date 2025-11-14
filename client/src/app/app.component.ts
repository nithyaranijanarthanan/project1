import { Component, signal } from '@angular/core';
//decorator
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent {
  protected readonly title = signal('client');
}
