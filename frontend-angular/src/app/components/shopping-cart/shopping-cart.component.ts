import { Component, OnInit } from '@angular/core';
import { Item } from '../../classes/item';
import { FavoritesServiceService } from '../../sevices/favorites-service';
import { Router } from '@angular/router';
import { Product } from '../../classes/product';
import { NgIf } from '@angular/common';
import { Order } from '../../classes/order';
import { UserServiceService } from '../../sevices/user-service.service';
import { OrderServiceService } from '../../sevices/order-service.service';
import { NumberWithCommasPipe } from '../../pipes/number-with-commas.pipe';
import { User } from '../../classes/user';

@Component({
  selector: 'app-shopping-cart',
  imports: [NgIf, NumberWithCommasPipe],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent implements OnInit {

  cart : Item[];
  selectedSum : number = 0;
  totalSumInCart : number = 0;

  user? : User 
  
  message : boolean = false

  constructor(private router: Router, 
              private favoritesService : FavoritesServiceService, 
              private userService : UserServiceService,
              private orderService : OrderServiceService){};
  ngOnInit(): void {
    this.favoritesService.cart$.subscribe(cart => {
      // this.cartService.clearCart();
      this.cart = cart;
      this.totalSumInCart = this.favoritesService.totalSumInCart
    });

    if (this.cart.length === 0) {
      this.router.navigate(['empty-cart']); // או כל ראוט אחר שתרצי
    } 
    
    this.user = this.userService.currentUser
  }

  deleteFromCart(productId : number){
    this.favoritesService.removeFromCart(productId)
    
       if (this.cart.length === 0) {
      this.router.navigate(['empty-cart']); // או כל ראוט אחר שתרצי
    }  
  }

  updateSum(event : Event, sum : number){
    const checked = (event.target as HTMLInputElement).checked;
    if(checked)
      this.selectedSum += sum;
    else
      this.selectedSum -= sum;
  }

  buy(){
    if(this.selectedSum == 0)
      this.message = true
    else{
      const id : number = this.userService.currentUser ? this.userService.currentUser.userId : 0;
      const order : Order = new Order(
        id,
        this.selectedSum,
        new Date()
      )
      console.log(order);
      this.orderService.addOrder(order).subscribe(data => console.log(data));
      alert('הרכישה בוצעה בהצלחה!')
    }
  }
}
