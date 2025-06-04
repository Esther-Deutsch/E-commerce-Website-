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
import { ProductsServiceService } from '../../sevices/products-service.service';

@Component({
  selector: 'app-shopping-cart',
  imports: [NgIf, NumberWithCommasPipe],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss'
})
export class ShoppingCartComponent implements OnInit {

  cart : Item[]; // רשימה של כל הפריטים בסל
  selectedSum : number = 0; // משתנה שיכיל את הסכום של כל הרכבים שנבחרו
  selectedProducts : Product [] = []// משתנה שיכיל רשימה של המוצרים המובחרים 
  totalSumInCart : number = 0; // משתנה שיכיל את הסכום הכולל של הרכבים בסל

  user? : User // משתנה לשמירת המשתמש הנוכחי
  
  message : boolean = false

  // איתחולים
  constructor(private router: Router, 
              private favoritesService : FavoritesServiceService, 
              private userService : UserServiceService,
              private productService : ProductsServiceService,
              private orderService : OrderServiceService){};

  // הפעלת פונקציות ואיתחול משתנים בעת עליית הקומפוננטה
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

  // פונקציה למחיקת מוצר מהסל
  deleteFromCart(productId : number){
    this.favoritesService.removeFromCart(productId)
    
      if (this.cart.length === 0) {
        this.router.navigate(['empty-cart']); // או כל ראוט אחר שתרצי
    }  
  }

  // פונקציה שתעדכן את הסכום של המוצרים שנבחרו ומוסיף את הפרטיט הנבחר לסל
  updateSum(event : Event, sum : number, product : Product){
    const checked = (event.target as HTMLInputElement).checked;
    if(checked){
      this.selectedSum += sum;
      this.selectedProducts.push(product)
    }
    else{
      this.selectedSum -= sum;
      this.selectedProducts = this.selectedProducts.filter(item => item.productId !== product.productId);
    }
  }

  // פונקציה שתתבצע בעת רכישה
  buy(){
    if(this.selectedSum == 0)
      this.message = true
    else{

      for(let i = 0; i < this.selectedProducts.length ; i++){

        const original : Product = this.selectedProducts[i];
        const newQty: string = ((+this.selectedProducts[i].qntInStack) - 1).toString();
        
        const newProduct : Product = new Product(
          original.productId,
          original.categoryId,
          original.productName,
          original.desc,
          original.price,
          newQty,
          original.img,
          original.color,
        )
        
        this.productService.updateProduct(newProduct.productId, newProduct).subscribe({
          error: err => console.error('Update failed:', err)  
        });

        this.deleteFromCart(original.productId);
      }

      const id : number = this.userService.currentUser ? this.userService.currentUser.userId : 0;
      const order : Order = new Order(
        id,
        this.selectedSum,
        new Date()
      )
      this.orderService.addOrder(order).subscribe(data => console.log(data));
      alert('הרכישה בוצעה בהצלחה!')
      this.router.navigate(['user-orders']);
    }
  }
}
