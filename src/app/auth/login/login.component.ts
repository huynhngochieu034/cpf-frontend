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
  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  @ViewChild('SignInForm') SiForm: NgForm;
  public formLogin: FormGroup;

  ngOnInit() {
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

  /**CHỨC NĂNG ĐĂNG NHẬP*/
  DangNhap() {
    console.log(this.formLogin.value);
    let loginObject = this.formLogin.value;
    if (loginObject.Remember === null) {
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
}
