import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHome, faUsers } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../services/auth.service'; 
import { FileUploadModule } from 'primeng/fileupload';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { ButtonModule } from 'primeng/button';




@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [CommonModule, RouterModule, FontAwesomeModule, FileUploadModule, ButtonModule
]
})
export class DashboardComponent {
  faHome = faHome;
  faUsers = faUsers;
  faUpload = faUpload;
  constructor(private router: Router , private authService: AuthService) {}
onUpload(event: any) {
  console.log("Upload completed!", event);
}
onUploadError(event:any){
  console.error("upload failed", event)
}

  logout() {
   this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
