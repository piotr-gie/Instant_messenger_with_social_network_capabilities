import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { error } from 'selenium-webdriver';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() onSignUpClickEmit: EventEmitter<any> = new EventEmitter();

  loginForm: FormGroup
  isPassHidden = true;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {}

  ngOnInit() {
    this.buildLoginForm();
    this.getCurrentUser();
  }

  submitLoginForm() {
    // this.authService.login(null).subscribe(respone => {
    // }, error => {
    //   console.log(error);
    // })

    this.authService.loggedIn = true; //TODO
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
