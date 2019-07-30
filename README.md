# AngularTemplate

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Angular Material Dynamic Theme
### Config material theme
- Define color of theme
$angular-template-indigo-primary: mat-palette($mat-indigo, 700);
$angular-template-accent: mat-palette($mat-yellow, 700);
$angular-template-warn: mat-palette($mat-red);

$angular-template-green-primary: mat-palette($mat-green, 600);
$angular-template-cyan-primary: mat-palette($mat-cyan, 700);

- Config default theme of project
$angular-template-theme: mat-light-theme($angular-template-red-primary, $angular-template-accent, $angular-template-warn);
config green theme of project
.green-theme {
  $blue-theme: mat-light-theme($angular-template-green-primary, $angular-template-accent, $angular-template-warn);
  @include angular-material-theme($blue-theme);
  // if you add covalent libary add this line to config covalent theme
  @include covalent-theme($blue-theme);
}
- Config cyan theme of project
.cyan-theme {
  $cyan-theme: mat-light-theme($angular-template-cyan-primary, $angular-template-accent, $angular-template-warn);
  @include angular-material-theme($cyan-theme);
  // if you add covalent libary add this line to config covalent theme
  @include covalent-theme($cyan-theme);
}
- Add menu setting theme color in file template
<button mat-icon-button [matMenuTriggerFor]="menu"><mat-icon>format_color_fill</mat-icon></button>
<mat-menu #menu="matMenu" class="d-inline-flex justify-content-center">
  <button class="icon-color b-c-primary" mat-fab (click)="changeTheme('')"></button>
  <button class="icon-color b-c-green" mat-fab (click)="changeTheme('green-theme')"></button>
  <button class="icon-color b-c-cyan" mat-fab (click)="changeTheme('cyan-theme')"></button>
</mat-menu>
- Add control handle change theme color
theme = '';
public changeTheme(theme: string) {
this.theme = theme;
this.themeService.setTheme(this.theme);
}
- Binding theme
<mat-sidenav-container [ngClass]="theme">
....
</mat-sidenav-container>
### Create ThemeService
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
### Config theme in dialog
- Using ThemeService to obverable theme of project
  constructor(public dialogRef: MatDialogRef<DialogDynamicThemeComponent>, private themeService: ThemeService) {
    this.themeService.themeChange$.subscribe(theme => (this.theme = theme));
    this.themeService.getTheme();
  }
- Binding to DOM
<div [ngClass]="theme">
  ....
</div>
