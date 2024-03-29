import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { EmailTaken } from '../validators/email-taken';
import { RegisterValidators } from '../validators/register-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  
  constructor(private auth: AuthService, private emailTaken: EmailTaken) {}
  
  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  email = new FormControl(
    '',
    [Validators.required, Validators.email],
    [this.emailTaken.validate],
    );
    age = new FormControl('', [
      Validators.required,
      Validators.min(18),
      Validators.max(120),
    ]);
    password = new FormControl('', [
      Validators.required,
      Validators.pattern('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'),
    ]);
    confirm_password = new FormControl('', [Validators.required]);
    phoneNumber = new FormControl('', [
      Validators.required,
      Validators.minLength(17),
      Validators.maxLength(17),
    ]);
    
    showAlert = false;
    alertMsg = 'Please wait! Your account is being created.';
    alertColor = 'blue';
    inSubmissions = false;

  registerForm = new FormGroup(
    {
      name: this.name,
      email: this.email,
      age: this.age,
      password: this.password,
      confirm_password: this.confirm_password,
      phoneNumber: this.phoneNumber,
    },
    [RegisterValidators.match('password', 'confirm_password')],
  );

  async register() {
    this.showAlert = true;
    this.alertMsg = 'Please wait! Your account is being created.';
    this.alertColor = 'blue';
    this.inSubmissions = true;

    try {
      await this.auth.createUser(this.registerForm.value);
    } catch (e) {
      console.error(e);

      this.alertMsg = 'An unxpected error ocurred. Please try again late.';
      this.alertColor = 'red';

      this.inSubmissions = false;

      return;
    }

    this.alertMsg = 'Success! Your account has been created.';
    this.alertColor = 'green';
  }
}
