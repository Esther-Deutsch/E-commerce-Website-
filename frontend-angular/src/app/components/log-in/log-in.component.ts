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
    const name = this.loginForm.get('loginName')?.value;
    const password = this.loginForm.get('loginPassword')?.value;

    // בדיקה אם זה מנהל
    // if (name === 'טובה' && password === '11111111') {
    //   // קריאה ל-API של המנהל
    //   this.userService.login(name, password).subscribe({
    //     next: (res) => {
    //       alert(`${name}, ${password}`)
    //       if (res && res.Token) {

    //         localStorage.setItem('token', res.Token);
    //         this.userService.userIcon = 'logedin.png';
    //         // ניתוב לדף ניהול/מוצרים
    //         this.router.navigate(['/']);
    //       }
    //     },
    //     error: () => {
    //       alert('שם משתמש או סיסמה שגויים');
    //     },
    //   });
    // } else
    {
      // כניסה רגילה
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
  }

  goToRegister() {
    this.router.navigate(['register']);
  }
}
