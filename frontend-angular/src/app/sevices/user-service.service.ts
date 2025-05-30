import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../classes/user';
import { Order } from '../classes/order';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  userURL = "https://localhost:7059/api/User"
  logInURL = "https://localhost:7059/api/LogIn"

  constructor(private httpClient : HttpClient) { }
  
  userIcon : string =  "signedout.png" // האייקון שיוצג, בתנאי אם יש משתמש קיים או לא
  currentUser? : User // המשתמש הנוכחי
  allUsers : User[] = [] // משתנה לשמירת כל המשתמשים


  // פונצקיה שבודקת האם היוזר הנוכחי הוא מנהל
  isManager(){
    if(this.currentUser?.userName == "טובה" && this.currentUser.password == "11111111")
      return true;
    return false;
  }

  // פונקציה לכניסת משתמש
 login(name: string, password: string): Observable<any> {
    const body = { Name: name, Password: password };
    return this.httpClient.post(this.logInURL, body);
  }
  
  //פונקציה להצבת המשתמש הנוכחי
  setUser(user : User) : void 
  {
    this.currentUser = user
  }

  // מחזיר את כל המשתמשים
  getAllUsers() : Observable<User[]>
  {
    return this.httpClient.get<User[]>(this.userURL)
  }

  //שלו ID מחזיר יוזר לפי ה 
  getUserById(id : number) : Observable<User>
  {
    return this.httpClient.get<User>(`${this.userURL}/id/${id}`)
  }

  //מחזיר משתמש לפני השם והסיסמה שלו
  getUserByNameAndPassword(name : string, pass : string) : Observable<User>
  {
    return this.httpClient.get<User>(`${this.userURL}/nameandpassword`,{
    params: { name: name, password: pass }
  })
  }

  //מוסיף משתמש חדש
  addUser(user : User) : Observable<any>
  {
    return this.httpClient.post(this.userURL, user)
  }

  //עדכון משתמש
  updateUser(user : User) : Observable<any>
  {
    return this.httpClient.put(`${this.userURL}/update`, user)
  }

  //delete
  deleteUser(id : number) : Observable<any> 
  {
    return this.httpClient.delete(`${this.userURL}/${id}`)
  }

}
