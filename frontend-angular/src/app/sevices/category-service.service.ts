import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf } from 'rxjs';
import { Category } from '../classes/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {


  categoryURL : string = "https://localhost:7059/api/Category"

  //HttpClient - מאפשר לעשות קריאות שרת
  constructor(private httpClient : HttpClient) { }

  //CRUD - פונקציות

  //פונקציה להחזרת כל הקטגוריות
  getAllCategories() : Observable<Category[]>
  {
    return this.httpClient.get<Category[]>(this.categoryURL)
  }

  //החזרת קטגוריה לפי שם
  getCategoryByName(name : string) : Observable<string>
  {
    return this.httpClient.get<string>(`${this.categoryURL}/${name}`, {responseType: 'text' as 'json'})
  }

  //ID פונקציה המחזירה קטגוריה לפי 
  getCategoryById(id : number) : Observable<Category>
  {
    return this.httpClient.get<Category>(`${this.categoryURL}/${id}`)
  }

  // [Authorize]
  //פונקציה להוספת קטגוריה חדשה
  addCategory(categoryName : string) : Observable<any>
  {
    const token = localStorage.getItem('token');
    const jwt = token !== null ? JSON.parse(token) : null;
    if (jwt.value == 'manager') {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${jwt.token}`,// ודא שה-token תקין
        'Content-Type': 'application/json' 
      })
      return this.httpClient.post(this.categoryURL, JSON.stringify(categoryName), { headers });
    }
    return this.httpClient.post(this.categoryURL, JSON.stringify(categoryName),
    {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    })
  }

  // [Authorize]
  //פונקציה לעדכון קטגוריה
  updateCategory(id : number, category : string) : Observable<any>
  {
    const token = localStorage.getItem('token');
    const jwt = token !== null ? JSON.parse(token) : null;
    if (jwt.value == 'manager') {
      const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwt.token}`,
      'Content-Type': 'application/json'
      
    });
    return this.httpClient.put(`${this.categoryURL}/${id}`, JSON.stringify(category), { headers })
    }
    return this.httpClient.put(  `${this.categoryURL}/${id}`,
      JSON.stringify(category),
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      })
  }

  // [Authorize]
  //פונקציה למחיקת קטגוריה
  deleteCategory(id : number) : Observable<any>
  {
    const token = localStorage.getItem('token');
    const jwt = token !== null ? JSON.parse(token) : null;
    if (jwt.value == 'manager') {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${jwt.token}` // ודא שה-token תקין
      })
      return this.httpClient.delete(`${this.categoryURL}/${id}`, { headers });
    }
    return this.httpClient.delete(`${this.categoryURL}/${id}`)
  }
}
