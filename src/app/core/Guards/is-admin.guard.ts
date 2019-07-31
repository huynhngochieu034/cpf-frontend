import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import swal from 'sweetalert';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class IsAdminGuard implements CanActivate {
  constructor(private router: Router) { }
  private key: string = 'credentials';
  // private key22: string = 'username';
  //canActivate sẽ verify quyền vào trang
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem(this.key) || sessionStorage.getItem(this.key)) {
      if (localStorage.getItem(this.key)) {
        var sUerInfo: string = localStorage.getItem(this.key);
      } else {
        var sUerInfo: string = sessionStorage.getItem(this.key);
      }

      let userLogin = JSON.parse(sUerInfo);

      if (userLogin.isAdmin) {
        /**THÔNG BÁO ĐĂNG NHẬP THÀNH CÔNG */
        swal(`WelcomeBack ${userLogin.username}!`, {
          icon: 'success'
        });
        setTimeout(() => {
          $('.swal-overlay--show-modal').trigger('click');
        }, 1500);
        return true;
      } else {
        swal('You Have No Admin Authorization', {
          icon: 'error'
        });
        setTimeout(() => {
          $('.swal-overlay--show-modal').trigger('click');
        }, 1500);
        this.router.navigate(['/auth/login']);
        return false;
      }
      //alert("You Have No Admin Authorization");
      //this.router.navigate(['/auth/login']);
    } else {
      alert('Please Login First !!');
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
