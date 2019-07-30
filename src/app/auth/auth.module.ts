import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Authentication Routing Path Declaration
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { MaterialModule } from '../material.module';




@NgModule({
  imports: [CommonModule, AuthRoutingModule, MaterialModule, FormsModule, ReactiveFormsModule],
  declarations: [LoginComponent, RegisterComponent, ForgotPasswordComponent, PageNotFoundComponent],
})
export class AuthModule {}
