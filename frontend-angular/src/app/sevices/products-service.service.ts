import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../classes/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsServiceService {

  productsURL : string = "https://localhost:7059/api/Product"

  constructor(private httpClient : HttpClient) { }


    public products : Product[] // משתנה שיכיל רשימת מוצרים להצגה
    public allProducts : Product[] // משתנה שיכיל את כל המוצרים
    public filteredByPrice : Product [] // משתנה שיכיל את המוצרים ממוינים לפי מחרי
    public filteredFree : Product [] // משתנה שיכיל מוצרים לפי חיפוש חופשי
    

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

    // [Authorize]
    //פונקציה שתחזיר את כל המוצר שלא במלאי
    getNotInStack() : Observable<Product[]>
    {
      const token = localStorage.getItem('token');
      const jwt = token !== null ? JSON.parse(token) : null;
      if (jwt.value == 'manager') {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${jwt.token}` // ודא שה-token תקין
        })
        return this.httpClient.get<Product[]>(`${this.productsURL}/outOfStack`, { headers });
      }
      return this.httpClient.get<Product[]>(`${this.productsURL}/outOfStack`)
    }

    // [Authorize]
    //פונקציה שתוסיף מוצר
    addProduct(newProduct : Product) : Observable<any>
    {
      // console.log(newProduct);
      const token = localStorage.getItem('token');
      const jwt = token !== null ? JSON.parse(token) : null;
      if (jwt.value == 'manager') {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${jwt.token}` // ודא שה-token תקין
        })
        return this.httpClient.post(this.productsURL, newProduct, { headers });
      }
      return this.httpClient.post(this.productsURL, newProduct)
    }
    
    // [Authorize] - ????
    //פונקציה שתעדכן מוצר
    updateProduct(id : number, product : Product) : Observable<any>
    {
      return this.httpClient.put(`${this.productsURL}/${id}`, product)
    }

    // [Authorize]
    //פונקציה שתמחק מוצר
    deleteProduct(id : number) : Observable<any> 
    {
      const token = localStorage.getItem('token');
      const jwt = token !== null ? JSON.parse(token) : null;
      if (jwt.value == 'manager') {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${jwt.token}` // ודא שה-token תקין
      })
      return this.httpClient.delete(`${this.productsURL}/${id}`, { headers });
    }
      return this.httpClient.delete(`${this.productsURL}/${id}`)
    }
}

