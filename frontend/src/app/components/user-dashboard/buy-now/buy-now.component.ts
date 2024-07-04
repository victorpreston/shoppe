// import { Component, OnInit, ViewChild } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { faCamera, faMobileAlt, faLaptop, faHeadphonesAlt, faGamepad, faTv, faTshirt, faCookie, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
// import { ProductService } from '../../../services/product.service';
// import { Product } from '../../../interfaces/product';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';
// import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
// import { MatCardModule } from '@angular/material/card';
// import { SearchService } from '../../../services/search.service';

// @Component({
//   selector: 'app-buy-now',
//   standalone: true,
//   templateUrl: './buy-now.component.html',
//   styleUrls: ['./buy-now.component.css'],
//   imports: [CommonModule, FontAwesomeModule, FormsModule, RouterModule, MatPaginatorModule, MatCardModule]
// })
// export class BuyNowComponent implements OnInit {
//   faCamera = faCamera;
//   faMobileAlt = faMobileAlt;
//   faLaptop = faLaptop;
//   faHeadphonesAlt = faHeadphonesAlt;
//   faGamepad = faGamepad;
//   faTv = faTv;
//   faTshirt = faTshirt;
//   faCookie = faCookie;
//   faShoppingBag = faShoppingBag

//   categories = [
//     { id: 1, name: 'Camera', icon: this.faCamera },
//     { id: 2, name: 'Phones', icon: this.faMobileAlt },
//     { id: 3, name: 'Laptops', icon: this.faLaptop },
//     { id: 7, name: 'Clothes', icon: this.faTshirt },
//     { id: 5, name: 'Gaming', icon: this.faGamepad },
//     { id: 6, name: 'Screens', icon: this.faTv },
//     { id: 7, name: 'Clothes', icon: this.faTshirt },
//     { id: 8, name: 'Cookies', icon: this.faCookie },
//     { id: 6, name: 'Screens', icon: this.faTv },
//     { id: 8, name: 'Cookies', icon: this.faCookie },
//   ];

//   products: Product[] = [];
//   filteredProducts: Product[] = [];
//   paginatedProducts: Product[] = [];
//   selectedCategoryId: number | null = null;
//   currentPage: number = 0;
//   itemsPerPage: number = 6; // Set items per page to 6
//   totalProducts: number = 0;

//   @ViewChild(MatPaginator) paginator!: MatPaginator;

//   constructor(private productService: ProductService, private searchService: SearchService) {}

//   ngOnInit() {
//     this.productService.getProducts().subscribe(
//       (products) => {
//         this.products = products;
//         this.filteredProducts = products; // Show all products by default
//         this.totalProducts = products.length;
//         this.updatePagination();
//       },
//       (error) => {
//         console.error('Error fetching products:', error);
//       }
//     );
//   }

//   filterProducts(categoryId: number | null) {
//     this.selectedCategoryId = categoryId;
//     if (categoryId !== null) {
//       this.filteredProducts = this.products.filter(product => product.categoryId === categoryId);
//     } else {
//       this.filteredProducts = this.products;
//     }
//     this.currentPage = 0; // Reset to first page
//     this.totalProducts = this.filteredProducts.length;
//     this.updatePagination();
//   }

//   updatePagination() {
//     const startIndex = this.currentPage * this.itemsPerPage;
//     const endIndex = startIndex + this.itemsPerPage;
//     this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
//   }

//   onPageChange(event: PageEvent) {
//     this.currentPage = event.pageIndex;
//     this.itemsPerPage = event.pageSize;
//     this.updatePagination();
//   }
// }


import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCamera, faMobileAlt, faLaptop, faHeadphonesAlt, faGamepad, faTv, faTshirt, faCookie, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../interfaces/product';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { SearchService } from '../../../services/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-buy-now',
  standalone: true,
  templateUrl: './buy-now.component.html',
  styleUrls: ['./buy-now.component.css'],
  imports: [CommonModule, FontAwesomeModule, FormsModule, RouterModule, MatPaginatorModule, MatCardModule]
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
  faShoppingBag = faShoppingBag;

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
  paginatedProducts: Product[] = [];
  selectedCategoryId: number | null = null;
  currentPage: number = 0;
  itemsPerPage: number = 6; // Set items per page to 6
  totalProducts: number = 0;
  private searchSubscription!: Subscription;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private productService: ProductService, private searchService: SearchService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe(
      (products) => {
        this.products = products;
        this.filteredProducts = products; // Show all products by default
        this.totalProducts = products.length;
        this.updatePagination();
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );

    this.searchSubscription = this.searchService.getSearchTerm().subscribe(term => {
      this.applySearchFilter(term);
    });
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

  filterProducts(categoryId: number | null) {
    this.selectedCategoryId = categoryId;
    if (categoryId !== null) {
      this.filteredProducts = this.products.filter(product => product.categoryId === categoryId);
    } else {
      this.filteredProducts = this.products;
    }
    this.currentPage = 0; // Reset to first page
    this.totalProducts = this.filteredProducts.length;
    this.updatePagination();
  }

  applySearchFilter(term: string) {
    this.filteredProducts = this.products.filter(product => product.name.toLowerCase().includes(term.toLowerCase()));
    this.currentPage = 0; // Reset to first page
    this.totalProducts = this.filteredProducts.length;
    this.updatePagination();
  }

  updatePagination() {
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.itemsPerPage = event.pageSize;
    this.updatePagination();
  }
}