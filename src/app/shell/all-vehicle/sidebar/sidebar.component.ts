import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  constructor() {}
  public userAD;
  ngOnInit() {
    this.getAdInfo();
  }

  getAdInfo = () => {
    let loggeduser;
    if (localStorage.getItem('credentials')) {
      loggeduser = JSON.parse(localStorage.getItem('credentials'));
      this.userAD = loggeduser.username;
    } else {
      loggeduser = JSON.parse(sessionStorage.getItem('credentials'));
      this.userAD = loggeduser.username;
    }
  };
}
