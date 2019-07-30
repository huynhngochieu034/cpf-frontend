import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'bootstrap';
@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.scss']
})
export class LandingpageComponent implements OnInit {
  /**
   * Owl Carousel Options
   */
  mySlideOptions = { items: 1, dots: true, nav: false };

  constructor() {}

  ngOnInit() {
    $(document).ready(function() {
      var outletH = $('.carousel').outerHeight();
      console.log('out-let carousel Height: ', outletH);
      $('.carousel-item').css({
        height: outletH
      });

      $('.carousel').carousel({
        interval: 5000
      });
    });
  }
}
