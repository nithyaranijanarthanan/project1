import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [
    CommonModule,
    DialogModule,
    TableModule,
    ButtonModule,
    FormsModule,
    InputTextModule
  ]
})
export class HomeComponent implements OnInit {
  users: any[] = [];
  loading = false;

  displayEditDialog = false;

  editUserData: any = {
    id: null,
    name: '',
    email: '',
    password: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.loading = true;
    this.http.get<any>('http://localhost:3001/api/getAllUsers').subscribe(
      res => {
        this.loading = false;
        if (res.status === 200) {
          this.users = res.results;
        } else {
          alert(res.reason);
        }
      },
      err => {
        this.loading = false;
        alert('Error fetching users');
        console.error(err);
      }
    );
  }

  deleteUser(id: number) {
    if (!confirm('Are you sure you want to delete this user?')) return;

    this.http.delete<any>(`http://localhost:3001/api/deleteUser/${id}`).subscribe(
      res => {
        if (res.status === 200) {
          alert('User deleted successfully');
          this.fetchUsers();
        } else {
          alert(res.reason);
        }
      },
      err => {
        alert('Error deleting user');
        console.error(err);
      }
    );
  }

  openEditDialog(user: any) {
    this.editUserData = { ...user };
    this.displayEditDialog = true;
  }

  saveEdit() {
    const updateData = {
      name: this.editUserData.name,
      email: this.editUserData.email,
      password: this.editUserData.password
    };

    this.http
      .put<any>(`http://localhost:3001/api/updateUser/${this.editUserData.id}`, updateData)
      .subscribe(
        res => {
          if (res.status === 200) {
            alert('User updated successfully');
            this.displayEditDialog = false;
            this.fetchUsers();
          } else {
            alert(res.reason);
          }
        },
        err => {
          alert('Error updating user');
          console.error(err);
        }
      );
  }
}
