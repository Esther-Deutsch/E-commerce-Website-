import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserServiceService } from '../../sevices/user-service.service';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../classes/user';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule, NgStyle, MatFormFieldModule, MatInputModule, MatIconModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {


  inputsWidth = '300px'; // משתנה לשמירת הרוחב של האימפוטים 

   hide = signal(true);
   clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

constructor(private router : Router, private user_service : UserServiceService){}


registerForm: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    password: new FormControl('',[ Validators.minLength(8) , Validators.maxLength(12), ]),
    fName: new FormControl('', [Validators.required]),
    lName: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    address: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email])
  })

  

  submit(){
      const new_user = new User(
        0,
        this.registerForm.get("userName")?.value,
        this.registerForm.get("password")?.value,
        this.registerForm.get("fName")?.value,
        this.registerForm.get("lName")?.value,
        this.registerForm.get("phoneNumber")?.value,
        this.registerForm.get("address")?.value,
        this.registerForm.get("email")?.value,
      )
  this.user_service.getUserByNameAndPassword(
    this.registerForm.get("userName")?.value,
    this.registerForm.get("password")?.value
  ).subscribe({
    next: user => {
      // אם המשתמש קיים - נווט להתחברות
      this.router.navigate(["log-in"]);
    },
    error: err => {
      // אם המשתמש לא קיים - הוסף אותו
      this.user_service.addUser(new_user).subscribe(() => {
        this.user_service.userIcon = "logedin.png";
        this.user_service.setUser(new_user);
        // alert(new_user.userName)
        this.router.navigate(["products"]);
      });
    }
  });
  }


  goToLogIN(){
      this.router.navigate(['log-in']);
  }

}