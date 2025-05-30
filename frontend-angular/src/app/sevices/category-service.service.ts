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

  //פונקציה להוספת קטגוריה חדשה
  addCategory(categoryName : string) : Observable<any>
  {
    return this.httpClient.post(this.categoryURL,    JSON.stringify(categoryName),
    {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    })
  }

  //פונקציה לעדכון קטגוריה
  updateCategory(id : number, category : string) : Observable<any>{
    return this.httpClient.put(  `${this.categoryURL}/${id}`,
    JSON.stringify(category),
    {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    })
  }

  //פונקציה למחיקת קטגוריה
  deleteCategory(id : number) : Observable<any>
  {
    return this.httpClient.delete(`${this.categoryURL}/${id}`)
  }

}
