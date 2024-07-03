import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-dashboard-navbar',
  standalone: true,
  imports: [FormsModule, CommonModule, FontAwesomeModule],
  templateUrl: './dashboard-navbar.component.html',
  styleUrls: ['./dashboard-navbar.component.css']
})
export class DashboardNavbarComponent {
  faSearch = faSearch;
  faShoppingCart = faShoppingCart;
  searchTerm: string = '';
  cartItemCount: number = 0;
  
  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getCartItemCount().subscribe(count => {
      this.cartItemCount = count;
    });
  }

  handleSearch() {
    // Handle search functionality
  }


  onFocus() {
    // Handle focus event if needed
  }

  onBlur() {
    // Handle blur event if needed
  }
}