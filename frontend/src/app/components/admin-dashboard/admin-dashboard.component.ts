import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component'; // Ensure this import

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  imports: [CommonModule, RouterOutlet, SidebarComponent, AdminNavbarComponent] // Ensure this import
})
export class AdminDashboardComponent {}