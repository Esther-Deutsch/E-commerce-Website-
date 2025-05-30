import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-empty-cart',
  imports: [RouterLink],
  templateUrl: './empty-cart.component.html',
  styleUrl: './empty-cart.component.scss'
})
export class EmptyCartComponent {
    
  constructor(private router : Router){}

  goToLogin(){
    this.router.navigate(['log-in'])
  }

  goToProducts(){
    this.router.navigate(['products'])
  }
}
