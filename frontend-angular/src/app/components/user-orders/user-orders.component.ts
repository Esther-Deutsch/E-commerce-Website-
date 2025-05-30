import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../sevices/user-service.service';
import { OrderServiceService } from '../../sevices/order-service.service';
import { Order } from '../../classes/order';
import { DatePipe } from '@angular/common';
import { map } from 'rxjs';
import { NumberWithCommasPipe } from '../../pipes/number-with-commas.pipe';

@Component({
  selector: 'app-user-orders',
  imports: [DatePipe, NumberWithCommasPipe],
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.scss'
})
export class UserOrdersComponent implements OnInit {

  constructor(private userService : UserServiceService,
              private orderService : OrderServiceService) {}

  userOrders : Order[] = []
  totalSum : number
  ngOnInit(): void {
    const userId : number = this.userService.currentUser ? this.userService.currentUser.userId : 0;
    this.orderService.getOrderByUser(userId).pipe(
      map(orders => {
        this.totalSum = orders.reduce((sum, order) => sum + order.orderSum, 0);
        return orders;
      })
    ).subscribe(data => this.userOrders = data);
  }
}
