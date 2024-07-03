import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from '../../notification/notification.component';

interface Order {
  id: number;
  createdAt: Date;
  status: string;
  total: number;
}

@Component({
  selector: 'app-orders',
  standalone: true,
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  imports: [CommonModule, NotificationComponent]
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  notificationMessage: string | null = null;
  notificationType: 'success' | 'error' = 'success';

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.orderService.getOrders().subscribe({
      next: (orders: Order[]) => {
        this.orders = orders.map(order => ({ ...order, status: 'Pending' }));
      },
      error: (error) => {
        console.error('Error fetching orders:', error);
      }
    });
  }

  cancelOrder(orderId: number) {
    if (confirm('Are you sure you want to cancel this order?')) {
      this.orderService.cancelOrder(orderId).subscribe({
        next: () => {
          this.orders = this.orders.filter(order => order.id !== orderId);
          this.notificationMessage = 'Order cancelled successfully';
          this.notificationType = 'success';
        },
        error: (error) => {
          console.error('Error cancelling order:', error);
          this.notificationMessage = 'Error cancelling order';
          this.notificationType = 'error';
        }
      });
    }
  }

  closeNotification() {
    this.notificationMessage = null;
  }
}