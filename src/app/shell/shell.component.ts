import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router, ActivationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { fadeInItems, MatListItem, MatDialog } from '@angular/material';
import { AuthenticationService } from '../core/authentication/authentication.service';
import { ThemeService } from '../core/theme-service';

import * as $ from 'jquery';
import swal from 'sweetalert';
@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  animations: [fadeInItems]
})
export class ShellComponent implements OnInit, OnDestroy, AfterViewInit {
  /**
   * View Handle Variables
   */
  private unsubscribe$: Subject<void> = new Subject<void>();
  isProd = environment.production;
  envName = environment.envName;
  version = environment.versions.app;
  year = new Date().getFullYear();
  navigation = [
    { link: 'car', label:'Manage Vehicles'},
    { link: 'map', label: 'Map' },
    { link: 'dashboard', label: 'DashBoard' },
    { link: 'about', label: 'About' }
  ];
  navigationSideMenu = [...this.navigation];
  isAuthenticated;
  theme = '';

  /**
   * CONSTRUCTORING
   */
  constructor(
    private router: Router,
    private titleService: Title,
    private authenticationService: AuthenticationService,
    private themeService: ThemeService,
    public dialog: MatDialog
  ) {
    this.isAuthenticated = this.authenticationService.isAuthenticated();
  }

  ngOnInit(): void {
    this.subscribeToIsAuthenticated();
    this.subscribeToRouterEvents();

    $(document).ready(function() {
      $(window)
        .on('resize', function() {
          setMapHeight();
        })
        .trigger('resize');

      function setMapHeight() {
        var headerH = $('.toolbar').outerHeight(true);
        var footerH = $('.footer').outerHeight(true);
        var contentH = $(window).height() - headerH - footerH;
        $('.content').css({
          height: contentH
        });

        console.log(contentH);
      }
    });
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  ngAfterViewInit(): void {}
  /**
   * Event Handler
   */
  onLoginClick() {
    this.router.navigate(['/auth/login']);
  }

  onLogoutClick() {
    this.authenticationService.logout().subscribe(res => {
      swal(`GoodBye ${res}!`, {
        icon: 'success'
      });
      setTimeout(() => {
        $('.swal-overlay--show-modal').trigger('click');
        this.router.navigate(['/auth/login']);
      }, 1500);
    });
  }

  private subscribeToIsAuthenticated() {
    this.authenticationService.authChanged$.subscribe(() => {
      this.isAuthenticated = this.authenticationService.isAuthenticated();
    });
  }

  private subscribeToRouterEvents() {
    this.router.events.subscribe(event => {
      if (event instanceof ActivationEnd) {
        this.setPageTitle(event);
      }
    });
  }

  private setPageTitle(event: ActivationEnd) {
    let lastChild = event.snapshot;
    while (lastChild.children.length) {
      lastChild = lastChild.children[0];
    }
    const { title } = lastChild.data;
    this.titleService.setTitle(title ? `${title} - ${environment.appName}` : environment.appName);
  }

  public changeTheme(theme: string) {
    this.theme = theme;
    this.themeService.setTheme(this.theme);
  }
}
