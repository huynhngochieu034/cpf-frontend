import { Component, OnInit } from '@angular/core';
import { SignUpInfo } from 'src/app/core/http/signup-info';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

//import { AuthService } from 'src/app/authen/auth/auth.service';
//import { SignUpInfo } from 'src/app/authen/auth/signup-info';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  //constructor(private authService: AuthService) {}
  constructor(private authService: AuthenticationService) { }


  form: any = {};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  isSignUpFailed = false;
  isSuccess = false;
  errorMessage = '';
  successMessage = '';

  ngOnInit() {

  }

  /**CHỨC NĂNG ĐĂNG KÝ */
  onSubmit() {
    console.log(this.form);

    this.signupInfo = new SignUpInfo(
      this.form.fullname,
      this.form.username,
      this.form.email,
      this.form.password);

    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.successMessage = "User registered successfully!";
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        this.isSuccess = true;
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
