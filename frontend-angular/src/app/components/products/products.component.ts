import { Component, OnInit } from '@angular/core';
import { Product } from '../../classes/product';
import { ProductsServiceService } from '../../sevices/products-service.service';
import { BehaviorSubject } from 'rxjs';
import { FavoritesServiceService } from '../../sevices/favorites-service';
import { SingleProductComponent } from "../single-product/single-product.component";
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { UserServiceService } from '../../sevices/user-service.service';
import { NumberWithCommasPipe } from '../../pipes/number-with-commas.pipe';
import { NgIf } from '@angular/common';
import { ColorHeartDirective } from '../../directives/color-heart.directive';


@Component({
  selector: 'app-products',
  imports: [SingleProductComponent, NgIf, ColorHeartDirective, MatFormFieldModule, MatSelectModule, FormsModule, MatInputModule, NumberWithCommasPipe ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {


  showSingle : boolean = false
  productToSend : Product

  // favoriteImg : string = "favorites.png"
  carsBySearch : string
  
  constructor(private favoriteService : FavoritesServiceService, 
              public productService : ProductsServiceService,
              public userService : UserServiceService
            ){}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(data => this.productService.products = data);
}

  add(product : Product){
    if(this.userService.currentUser){
      alert('נוסף בהצלחה!')
      this.favoriteService.addToCart(product)
      // this.favoriteImg = "favorites-yellow.png"
    }
    else{
      alert("עליך להתחבר לאתר")
    }
  }

  showProduct(p : Product){
    this.showSingle = true
    this.productToSend = p
  }

  searchChanged(s : string){
    
  }

  closeSingle() {
    this.showSingle = false;
  }
}
