import { Component, OnInit } from '@angular/core';
import { User } from '../../classes/user';
import { UserServiceService } from '../../sevices/user-service.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';


@Component({
  selector: 'app-all-users',
  imports: [],
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.scss'
})
export class AllUsersComponent implements OnInit{

  users : User[] = []

  constructor(private route : Router, private userService : UserServiceService) {}

  // הפעלת הפונקציות כאשר התוכנית עולה
  ngOnInit(): void {
    this.loadUsers()
  }

  // פונקציה שמסירה משתמש
  deleteUser(id : number)
  {
    this.userService.deleteUser(id).subscribe(()=>{
      this.loadUsers();
    });
  }

  // פונקציה שתציג לנו את כל המשתמשים במערכת כשהם ממוינים לפי הא-ב
  loadUsers(){
    this.userService.getAllUsers().pipe(
      map(sortedUsers=>sortedUsers.sort((a,b)=>a.fName.localeCompare(b.fName)))
    ).subscribe(data => this.users = data);
  }
}
