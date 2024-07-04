import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../../services/auth.service';
import { User } from '../../interfaces/user';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, NavbarComponent, FontAwesomeModule, NotificationComponent, NavbarComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  faArrowCircleLeft = faArrowCircleLeft;
  user: User = {
    id: 0,
    email: '',
    password: '',
    name: '',
    role: 'USER',
    createdAt: new Date(),
    updatedAt: new Date()
  };
  notificationMessage: string | null = null;
  notificationType: 'success' | 'error' = 'success';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.userService.register(this.user).subscribe(
      response => {
        this.notificationType = 'success';
        this.notificationMessage = 'Registered Successfully';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000); //redirect after 3 seconds.
      },
      error => {
        this.notificationType = 'error';
        this.notificationMessage = 'Error Registering User. Try Again';
      }
    );
  }

  closeNotification() {
    this.notificationMessage = null;
  }
}