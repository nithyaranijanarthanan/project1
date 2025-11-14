import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule]
})
export class homeComponent implements OnInit {
  users: any[] = [];
  loading = false;

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

 editUser(user: any) {
  const newName = prompt('Enter new name:', user.name);
  const newEmail = prompt('Enter new email:', user.email);
  const newPassword = prompt('Enter new password:', user.password);

  if (!newName || !newEmail || !newPassword) return;

  const updateData = {
    name: newName,
    email: newEmail,
    password: newPassword
  };

  this.http.put<any>(`http://localhost:3001/api/updateUser/${user.id}`, updateData).subscribe(
    res => {
      if (res.status === 200) {
        alert('User updated successfully');
        this.fetchUsers(); 
      } else {
        alert(res.reason);
      }
    },
    err => {
      console.error('Error updating user', err);
      alert('Error updating user');
    }
  );
}

}
