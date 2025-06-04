import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

// בשביל הטופס
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { UserServiceService } from '../../sevices/user-service.service';
import { User } from '../../classes/user';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-log-in',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
})
export class LogInComponent {
  constructor(
    private router: Router,
    private userService: UserServiceService
  ) {}

  loginForm: FormGroup = new FormGroup({
    loginName: new FormControl(),
    loginPassword: new FormControl('', [Validators.required]),
  });

  submit() {
    // בעת החלפת משתמשים - שזה יוודא שהתוכן מתרוקן
    this.userService.logout()

    // html שליפת הנתונים מתוך הטופס ב 
    const name = this.loginForm.get('loginName')?.value;
    const password = this.loginForm.get('loginPassword')?.value;

    // בשביל לראות אם המשתמש מנהל ולהחזיר טוקן login שליחה לפונקציה של
    this.userService.login(name, password).subscribe((data) => {
      localStorage.setItem('token', JSON.stringify(data));
      // if(data.role == 'manager')
        // this.userService.isManager = true;
    });

    // לשלוף את המשתמש ולהציב אותו במשתנה ואם אין כזה משתמש לנווט לעמוד של הרשם
    this.userService.getUserByNameAndPassword(name, password).subscribe({
      next: (user) => {
        if (user) {
          this.userService.setUser(user);
          this.userService.userIcon = 'logedin.png';
          this.router.navigate(['/products']);
        }
      },
      error: (err) => {
        this.router.navigate(['/register']);
      },
    });

  }

  // מנווט לעמוד הרשם בעת לחיצה על הכפתור של הרשם
  goToRegister() {
    this.router.navigate(['register']);
  }
}
