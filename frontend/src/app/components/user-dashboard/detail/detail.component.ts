import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../interfaces/product';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
  imports: [CommonModule, FontAwesomeModule, RouterLink]
})
export class DetailComponent implements OnInit {
  product: Product | undefined;
  faShoppingBag = faShoppingBag;
    errorMessage: string | null = null;


  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService

  ) {}

  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(Number(productId)).subscribe(
        (product) => {
          this.product = product;
        },
        (error) => {
          console.error('Error fetching product:', error);
        }
      );
    }
  }

  addToCart(productId: number) {
    this.cartService.addToCart(productId).subscribe({
      next: () => {
        console.log(`Product with ID: ${productId} added to cart`);
      },
      error: (error) => {
        this.errorMessage = 'Failed to add product to cart. Please try again.';
        console.error('Error adding product to cart:', error);
      }
    });
  }
}