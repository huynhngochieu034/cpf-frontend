import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private theme = '';
  public themeChange$ = new Subject<string>();

  constructor() {}

  public setTheme(theme) {
    this.theme = theme;
    this.themeChange$.next(this.theme);
  }
  public getTheme() {
    this.themeChange$.next(this.theme);
  }
}
