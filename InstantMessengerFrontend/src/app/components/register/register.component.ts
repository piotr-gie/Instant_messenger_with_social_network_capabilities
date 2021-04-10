import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

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
    private authService: AuthService) {}

  ngOnInit() {
    this.buildRegisterForm();
  }

  submitRegisterForm() {
    // this.authService.register(this.registerForm.value).subscribe(response => {  
    // })
    this.authService.setCurrentUser(this.registerForm.value); //TODO
    this.closeRegisterForm();
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