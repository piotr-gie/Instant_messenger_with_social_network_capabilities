import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() onSignUpClickEmit: EventEmitter<any> = new EventEmitter();

  loginForm: FormGroup
  isPassHidden = true;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private userService: UserService) {}

  ngOnInit() {
    this.buildLoginForm();
    this.getCurrentUser();
  }

  submitLoginForm() {
    // this.authService.login(null).subscribe(respone => {
    // }, error => {
    //   console.log(error);
    // })

    this.authService.login(null);
    this.authService.loggedIn = true; 

    this.userService.getModels().subscribe((response) => {
      console.log(response);
    });
   
  }

  getCurrentUser() {
    this.authService.currentUser$.subscribe(user => {
      this.authService.loggedIn = !!user;
    }, error => {
      console.log(error);
    })
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
