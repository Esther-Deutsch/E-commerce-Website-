import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserServiceService } from '../../sevices/user-service.service';
import { User } from '../../classes/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  imports: [ReactiveFormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {

  constructor(private route : Router, private userService : UserServiceService) {}

  myUser? : User

  ngOnInit(): void {
    
    this.myUser = this.userService.currentUser;  
    console.log(this.myUser);
      

      if (this.myUser) {
          this.updateForm.patchValue({
          userName: this.myUser.userName,
          fName: this.myUser.fName,
          lName: this.myUser.lName,
          phone: this.myUser.phoneNumber,
          address: this.myUser.address,
          email: this.myUser.email,
          password: this.myUser.password
        });
      }
  }


  updateForm: FormGroup = new FormGroup({
      userName: new FormControl('', Validators.required),
      fName: new FormControl('', Validators.required),
      lName: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })

  submit(){

    const updated_user = new User(
      this.myUser == null ? 0 : this.myUser.userId,
      this.updateForm.get("userName")?.value,
      this.updateForm.get("password")?.value,
      this.updateForm.get("fName")?.value,
      this.updateForm.get("lName")?.value,
      this.updateForm.get("phone")?.value,
      this.updateForm.get("address")?.value,
      this.updateForm.get("email")?.value,
    )

    this.userService.updateUser(updated_user).subscribe();
    this.userService.currentUser = updated_user;
    alert("השינויים נשמרו בהצלחה!");
  }
}
