import { Component, OnInit } from '@angular/core';
import { User } from '../../classes/user';
import { UserServiceService } from '../../sevices/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-users',
  imports: [],
  templateUrl: './all-users.component.html',
  styleUrl: './all-users.component.scss'
})
export class AllUsersComponent implements OnInit{

  users : User[] = []

  constructor(private route : Router, private userService : UserServiceService) {}
  ngOnInit(): void {
    this.loadUsers()
  }


  deleteUser(id : number)
  {
    this.userService.deleteUser(id).subscribe(()=>{
      this.loadUsers();
    });
  }

  loadUsers(){
    this.userService.getAllUsers().subscribe(data => this.users = data);
  }
}
