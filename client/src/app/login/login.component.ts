import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {}

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
