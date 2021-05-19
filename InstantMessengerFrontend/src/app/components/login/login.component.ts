import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private userService: UserService,
    private toastrService: ToastrService) {}

  ngOnInit() {
    this.buildLoginForm();
    this.getCurrentUser();
  }

  submitLoginForm() {
    // this.authService.login(null).subscribe(respone => {
    // }, error => {
    //   console.log(error);
    // })

    this.authService.login(null).subscribe((response) => {
      this.toastrService.success("Successfully logged in!")
    }, error => {
      this.toastrService.error("Failed to login!");
    });
    this.authService.loggedIn = true; 
   
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
