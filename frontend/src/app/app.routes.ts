import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminGuard, AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './components/user-dashboard/profile/profile.component';
import { OrdersComponent } from './components/user-dashboard/orders/orders.component';
import { CartComponent } from './components/user-dashboard/cart/cart.component';
import { ReviwedProductsComponent } from './components/user-dashboard/reviwed-products/reviwed-products.component';
import { BuyNowComponent } from './components/user-dashboard/buy-now/buy-now.component';
import { DetailComponent } from './components/user-dashboard/detail/detail.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'user-dashboard', component: UserDashboardComponent, canActivate: [AuthGuard], children: [
        { path: '', redirectTo: 'buy-now', pathMatch: 'full' },
        { path: 'profile', component: ProfileComponent },
        { path: 'orders', component: OrdersComponent },
        { path: 'cart', component: CartComponent },
        { path: 'reviewed-products', component: ReviwedProductsComponent },
        { path: 'buy-now', component: BuyNowComponent },
        { path: 'product/:id', component: DetailComponent }, // Ensure this points to DetailComponent
    ] },
    { path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AdminGuard] },
    { path: '**', component: NotFoundComponent }
];