import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCamera, faMobileAlt, faLaptop, faHeadphonesAlt, faGamepad, faTv, faTshirt, faCookie, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../interfaces/product';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-buy-now',
  standalone: true,
  templateUrl: './buy-now.component.html',
  styleUrls: ['./buy-now.component.css'],
  imports: [CommonModule, FontAwesomeModule, FormsModule, RouterModule]
})
export class BuyNowComponent implements OnInit {
  faCamera = faCamera;
  faMobileAlt = faMobileAlt;
  faLaptop = faLaptop;
  faHeadphonesAlt = faHeadphonesAlt;
  faGamepad = faGamepad;
  faTv = faTv;
  faTshirt = faTshirt;
  faCookie = faCookie;
  faShoppingBag = faShoppingBag

  categories = [
    { id: 1, name: 'Camera', icon: this.faCamera },
    { id: 2, name: 'Phones', icon: this.faMobileAlt },
    { id: 3, name: 'Laptops', icon: this.faLaptop },
    { id: 7, name: 'Clothes', icon: this.faTshirt },
    { id: 5, name: 'Gaming', icon: this.faGamepad },
    { id: 6, name: 'Screens', icon: this.faTv },
    { id: 7, name: 'Clothes', icon: this.faTshirt },
    { id: 8, name: 'Cookies', icon: this.faCookie },
    { id: 6, name: 'Screens', icon: this.faTv },
    { id: 8, name: 'Cookies', icon: this.faCookie },
  ];

  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedCategoryId: number | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(
      (products) => {
        this.products = products;
        this.filteredProducts = products; // Show all products by default
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  filterProducts(categoryId: number | null) {
    this.selectedCategoryId = categoryId;
    if (categoryId !== null) {
      this.filteredProducts = this.products.filter(product => product.categoryId === categoryId);
    } else {
      this.filteredProducts = this.products;
    }
  }
}