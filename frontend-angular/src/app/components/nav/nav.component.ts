import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { UserServiceService } from '../../sevices/user-service.service';
import { ProductsServiceService } from '../../sevices/products-service.service';
import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';
import { FavoritesServiceService } from '../../sevices/favorites-service';
import { NgIf } from '@angular/common';
import { Product } from '../../classes/product';
import { FormsModule } from '@angular/forms';
import { filter, pipe } from 'rxjs';



@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive, NgIf, FormsModule, MatButtonModule, MatMenuModule, MatBadgeModule, MatIconModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {

  searchText: string = '';

  constructor(private route: Router,
              public userService : UserServiceService, 
              public productsService : ProductsServiceService,
              public favoriteService : FavoritesServiceService){}

  // מציג את המוצרים לפי שם החברה
  filterByName(categoryId : number){
    this.productsService.getByCategory(categoryId).subscribe(data =>{ this.productsService.products = data });
    this.route.navigate(['Manufacturers']);
  }
  
  // מציג את הרכבים ממוינים לפי מחיר
  sortByPrice(filterBy : string){
    let cars : Product[]
    if(filterBy === 'low')
      cars = this.productsService.allProducts.sort((p1, p2) => p2.price - p1.price);
    else
      cars = this.productsService.allProducts.sort((p1, p2) => p1.price - p2.price);
    this.productsService.products = cars;
    this.route.navigate(['byprice']);
  }

  freeSearch(){
    const search = this.searchText.trim().toLowerCase();
    this.productsService.products = this.productsService.allProducts.filter(product =>
    product.productName.toLowerCase().includes(search) ||
    product.desc.toLowerCase().includes(search)
  );
  }

  // מציג את כל הרכבים
  goToAll(){
    this.productsService.products = this.productsService.allProducts;
  }

  // פונקציה שמנתקת את המשתמש מהאתר
  signOut(){
    this.userService.currentUser = undefined; // או null
    this.favoriteService.amountInCart = 0;
    this.favoriteService.clearCart();
    this.userService.userIcon = "signedout.png"
  }

  // פונקציה לעדכון המשתמש הנוכחי
  updateUser(){
    if(this.userService.currentUser){
      this.route.navigate(["user"]);
    }
    else
      alert("אין משתמש מחובר")
  }
}
