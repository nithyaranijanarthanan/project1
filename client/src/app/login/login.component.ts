import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  loading = false;
  username = '';
  password = '';

  constructor(private router: Router) {}

  onSubmit() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false;

      if (this.username && this.password) {
        alert('Login successful!');
        this.router.navigateByUrl('/home');
      } else {
        alert('Please enter username and password');
      }
    }, 1000);
  }
}
