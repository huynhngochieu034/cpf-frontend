import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsUserGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    //B1: lấy localestorage
    if (localStorage.getItem('userLogin') || sessionStorage.getItem('userLogin')) {
      return true;
    } else {
      //B2: Chưa đăng nhập thì đưa lại về trang dangnhap
      alert('Yêu Cầu Đăng Nhập');
      this.router.navigate([['/dangnhap']]);
      return false;
    }
  }
}
