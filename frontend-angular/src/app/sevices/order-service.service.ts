import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../classes/order';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  orderURL = "https://localhost:7059/api/Order"

  constructor(private httpClient : HttpClient) { }

    //פונקציה להחזרת כל ההזמנות
    getAllOrders() : Observable<Order[]>
    {
      return this.httpClient.get<Order[]>(this.orderURL)
    }
  
    //ID פונקציה המחזירה הזמנה לפי 
    getOrderById(id : number) : Observable<Order>
    {
      return this.httpClient.get<Order>(`${this.orderURL}/${id}`)
    }

    //פונקציה המחזירה הזמנה לפי משתמש
    getOrderByUser(id : number) : Observable<Order[]>
    {
      return this.httpClient.get<Order[]>(`${this.orderURL}/byUser/${id}`)
    }


    // פונקציה שמחזירה הזמנה לפי תאריך
    getByDate(date : Date) : Observable<Order[]>
    {
      return this.httpClient.get<Order[]>(`${this.orderURL}/byDate`, {params: { date: date.toISOString() }})
    }

    //פונקציה להוספת הזמנה חדשה
    addOrder(order: Order) : Observable<any>
    {
      return this.httpClient.post(this.orderURL, order)
    }

}
