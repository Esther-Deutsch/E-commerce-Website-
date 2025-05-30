import { Routes } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { HomeComponent } from './components/home/home.component';
import { NavComponent } from './components/nav/nav.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { Product } from './classes/product';
import { ProductsComponent } from './components/products/products.component';
import { EmptyCartComponent } from './components/empty-cart/empty-cart.component';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { managerGuard } from './guard/manager.guard';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';

export const routes: Routes = [
    { path : "" , component : ProductsComponent},
    { path : "products" , component : ProductsComponent},
    { path : "Manufacturers" , component : ProductsComponent},
    { path : "home",  component  :  HomeComponent },
    { path : "log-in",  component  :  LogInComponent },
    { path : "register",  component  : RegisterComponent },
    { path : "shopping-cart",  component  : ShoppingCartComponent },
    { path : "empty-cart",  component  : EmptyCartComponent },
    { path : "user-orders",  component  : UserOrdersComponent },
    { path : "user", component : UserComponent },
    { path : "all-users", component : AllUsersComponent, canActivate : [managerGuard] },
    { path : "all-categories", component : CategoriesComponent, canActivate : [managerGuard]  },
    { path : "manage-products", component : ManageProductsComponent, canActivate : [managerGuard] }
];
