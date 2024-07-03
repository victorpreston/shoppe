import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faSearch, 
  faCamera, 
  faTimes, 
  faMobileAlt, 
  faStopwatch, 
  faLaptop, 
  faHeadphonesAlt, 
  faGamepad, 
  faTv, 
  faCouch, 
  faTshirt, 
  faCookie, 
  faStar,
  faShoppingBag
} from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/product';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [NavbarComponent, FormsModule, CommonModule, FontAwesomeModule, MatPaginatorModule, MatIconModule]
})
export class HomeComponent implements OnInit {
  faSearch = faSearch;
  faCamera = faCamera;
  faMobileAlt = faMobileAlt;
  faWatch = faStopwatch;
  faLaptop = faLaptop;
  faGamepad = faGamepad;
  faHeadphonesAlt = faHeadphonesAlt;
  faTv = faTv;
  faCouch = faCouch;
  faTshirt = faTshirt;
  faCookie = faCookie;
  faStar = faStar;
  faTimes = faTimes;
  faShoppingBag = faShoppingBag;
  sidebarSearchTerm: string = '';
  hero = {
    title: 'Welcome to Our Store!',
    subtitle: 'Find the best deals and offers.',
  };

  // showOverlay = true;
  products: Product[] = [];
  paginatedProducts: Product[] = [];
  filteredProducts: Product[] = [];
  pageSize = 12;
  pageIndex = 0 ;
  isLoading = false;

  constructor(private productService: ProductService, private router: Router, private searchService: SearchService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(
      (products) => {
        this.products = products;
        this.filteredProducts = products;
        this.paginateProducts();
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );

    // Subscribe to search term changes
    this.searchService.currentSearchTerm.subscribe(searchTerm => {
      this.filterProducts(searchTerm);
    });
  }

  handleSidebarSearch() {
    console.log('Sidebar search term:', this.sidebarSearchTerm);
  }

  // closeOverlay() {
  //   this.showOverlay = false;
  // }

  viewProduct(product: Product) {
    this.productService.setSelectedProduct(product);
    this.router.navigate(['/product-details']);
  }

  addToCart(productId: number) {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.router.navigate(['/login']);
    }, 2000);
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.paginateProducts();
  }

  paginateProducts() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }

  filterProducts(searchTerm: string) {
    if (searchTerm) {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.filteredProducts = this.products;
    }
    this.paginateProducts();
  }

  filterByCategory(categoryId: number) {
    this.filteredProducts = this.products.filter(product => product.categoryId === categoryId);
    this.pageIndex = 0;
    this.paginateProducts();
  }
}