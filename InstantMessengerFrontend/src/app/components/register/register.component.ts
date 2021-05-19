import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/fetch/auth.service';
import { UserService } from 'src/app/services/fetch/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Output() onCancelClickEmit: EventEmitter<any> = new EventEmitter();
  
  registerForm: FormGroup;
  isPassHidden = true;
  isConfPassHidden = true;
  
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: ToastrService) {}

  ngOnInit() {
    this.buildRegisterForm();
  }

  submitRegisterForm() {
    // this.authService.register(this.registerForm.value).subscribe(response => {  
    // console.log(response) })
    // //this.authService.setCurrentUser(this.registerForm.value); //TODO
    this.closeRegisterForm();
    this.userService.postModel(this.registerForm.value).subscribe((response) => {
      this.toastrService.success("Successfully registered new account!")
    }, error => {
      this.toastrService.error("Failed to register!");
    });
    
  }

  closeRegisterForm() {
    this.onCancelClickEmit.emit();
  }

  private buildRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    })
    this.registerForm.setValidators(this.passComparisonValidator())
  }

  private passComparisonValidator(): ValidatorFn {
    return (group: FormGroup): ValidationErrors => {
      const password = group.controls['password'];
      const confirmPassword = group.controls['confirmPassword'];
      if (password.value !== confirmPassword.value) {
        confirmPassword.setErrors({notEquivalent: true});
      } else {
        confirmPassword.setErrors(null);
      }
      return;
    }
  }
}
