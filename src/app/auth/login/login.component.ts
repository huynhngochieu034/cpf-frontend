import { Component, OnInit, ViewChild } from '@angular/core';
import { fadeInItems } from '@angular/material';
import { AuthenticationService, LoginContext } from 'src/app/core/authentication/authentication.service';
import { Router } from '@angular/router';

import * as $ from 'jquery';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [fadeInItems]
})
export class LoginComponent implements OnInit {

  roles: string[] = [];
  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  @ViewChild('SignInForm') SiForm: NgForm;
  public formLogin: FormGroup;

  ngOnInit() {
    if (this.authenticationService.getToken()) {
      this.roles = this.authenticationService.getAuthorities();
    }
    /**VALIDATOR FOR SIGN IN FORM */
    this.formLogin = new FormGroup({
      TaiKhoanSI: new FormControl(null, [Validators.required]),
      //Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
      MatKhauSI: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      Remember: new FormControl()
    });
  }
  revError() {
    $('.error').remove();
  }

  /**CHỨC NĂNG ĐĂNG NHẬP - ĐĂNG KÝ */
  DangNhap() {
    console.log(this.formLogin.value);
    let loginObject = this.formLogin.value;
    if(loginObject.Remember===null){
      loginObject.Remember = false;
    }
    const context: LoginContext = {
      username: loginObject.TaiKhoanSI,
      password: loginObject.MatKhauSI,
      remember: loginObject.Remember
    };

    //Call Authentication Service
    this.authenticationService.login(context);
  }

  // DangNhap() {
  //   let loginObject = this.formLogin.value;
  //    const context: LoginContext = {
  //     username: loginObject.TaiKhoanSI,
  //     password: loginObject.MatKhauSI,
  //     remember: loginObject.Remember
  //    };
  // (this.authenticationService.login(context).subscribe(
  //   data => {
  //     console.log("sucess");
  //    if(data != null) {
  //     this.router.navigate(['/home']);
  //    }
      
  //   },
  //   error => {
  //     console.log("err"+error.statusText);
  //     this.router.navigate(['/home']);
  //   }
  // )
  // );
  // }

  /**CHỨC NĂNG ĐĂNG NHẬP - ĐĂNG KÝ */
  // DangNhap(){
  //   const body = new HttpParams()
  //   .set('username', this.formLogin.controls.TaiKhoanSI.value)
  //   .set('password', this.formLogin.controls.MatKhauSI.value)
  //   .set('grant_type', 'password');
  //   this.authenticationService.login(body.toString()).subscribe(data => {
  //     window.sessionStorage.setItem('token', JSON.stringify(data));
  //     console.log(window.sessionStorage.getItem('token'));
  //     this.router.navigate(['/home']);
  //   }, error => {
  //       alert(error.error.error_description)
  //   });
  // }
}
