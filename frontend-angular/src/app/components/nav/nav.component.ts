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
import { NgModel } from '@angular/forms';


@Component({
  selector: 'app-nav',
  imports: [RouterLink, RouterLinkActive, NgIf, MatButtonModule, MatMenuModule, MatBadgeModule, MatIconModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {

  cars = []
  filtrdCars = []

  constructor(private route: Router,
              public userService : UserServiceService, 
              public productsService : ProductsServiceService,
              public favoriteService : FavoritesServiceService){}

  filterByName(categoryId : number){
    this.productsService.getByCategory(categoryId).subscribe(data =>{ this.productsService.products = data });
  }
  
  sortByPrice(filterBy : string){
    
  }

  goToAll(){
    this.productsService.getAllProducts().subscribe(data =>{ this.productsService.products = data });
  }

  signOut(){
    this.userService.currentUser = undefined; // או null
    this.favoriteService.amountInCart = 0;
    this.favoriteService.clearCart();
    this.userService.userIcon = "signedout.png"
  }


  updateUser(){
    if(this.userService.currentUser){
      this.route.navigate(["user"]);
    }
    else
      alert("אין משתמש מחובר")
  }
}
