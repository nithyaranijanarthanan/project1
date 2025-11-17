import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule, CardModule, InputTextModule, ButtonModule, HttpClientModule]
})
export class LoginComponent {
  loading = false;
  username = '';
  password = '';

  constructor(private router: Router, private http: HttpClient) {}

  onSubmit() {
    if (!this.username || !this.password) {
      alert("Please enter username and password");
      return;
    }

    this.loading = true;

    this.http.post<any>("http://localhost:3001/api/login", { username: this.username, password: this.password })
      .subscribe({
        next: (res) => {
          this.loading = false;
          if (res.status === 200) {
            localStorage.setItem('user', JSON.stringify(res.results));
            this.router.navigateByUrl("/dashboard");
          } else {
            alert(res.reason || "User not found");
          }
        },
        error: (err) => {
          this.loading = false;
          alert(err.error?.reason || "Login failed");
        }
      });
  }
}
