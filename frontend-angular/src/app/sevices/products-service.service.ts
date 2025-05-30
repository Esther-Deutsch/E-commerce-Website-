import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../classes/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {

  productsURL : string = "https://localhost:7059/api/Product"

  constructor(private httpClient : HttpClient) { }


    public products : Product[]

    //CRUD - פונקציות

    //פונקציה שתחזיר את כל המוצרים
    getAllProducts() : Observable<any>
    {
      return this.httpClient.get(this.productsURL)
    }

    //ID פונקציה שתחזיר מוצר לפי ה 
    getById(id : number) : Observable<Product> 
    {
      return this.httpClient.get<Product>(`${this.productsURL}/${id}`)
    }

    //פונקציה שתחזיר מוצרים לפי קטגוריה
    getByCategory(id : number) : Observable<Product[]>
    {
      return this.httpClient.get<Product[]>(`${this.productsURL}/category/${id}`)
    }

    //פונקציה שתחזיר את כל המוצר שלא במלאי
    getNotInStack() : Observable<Product[]>
    {
      return this.httpClient.get<Product[]>(`${this.productsURL}/outOfStack`)
    }

    //פונקציה שתוסיף מוצר
    addProduct(newProduct : Product) : Observable<any>
    {
      console.log(newProduct);
      return this.httpClient.post(this.productsURL, newProduct)
    }

    //פונקציה שתעדכן מוצר
    updateProduct(id : number, product : Product) : Observable<any>
    {
      return this.httpClient.put(`${this.productsURL}/${id}`, {params: product})
    }

    //פונקציה שתמחק מוצר
    deleteProduct(id : number) : Observable<any> 
    {
      return this.httpClient.delete(`${this.productsURL}/${id}`)
    }

  }

