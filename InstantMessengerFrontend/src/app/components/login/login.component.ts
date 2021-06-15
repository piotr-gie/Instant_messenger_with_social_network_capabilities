import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/fetch/auth.service';
import { UserService } from 'src/app/services/fetch/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() onSignUpClickEmit: EventEmitter<any> = new EventEmitter();
  loginForm: FormGroup
  isPassHidden = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router) {}

  ngOnInit() {
    this.buildLoginForm();
  }

  submitLoginForm() {
    this.authService.login(this.loginForm.get('email').value,
      this.loginForm.get('password').value).subscribe((res) => {
        const token = res.token;
        const user = res.user;
        this.authService.setToken(token)
        this.authService.setCurrentUser(user);
        this.toastrService.success("Successfully logged in!")
        this.router.navigate(['/home']);
      }, () => {
        this.toastrService.error("Failed to login!");
    });  
  }

  openRegisterForm() {
    this.onSignUpClickEmit.emit();
  }

  private buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }
}
