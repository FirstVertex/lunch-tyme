import { Component, OnInit, HostListener } from '@angular/core';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { Restaurant } from 'src/app/models/restaurant';
import { trigger, state, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('pushOver', [
      // animation is handled in css.  just delay here when exiting to allow animation to play
      transition(':leave', [animate(300)]),
    ]),
    trigger('slideOut', [
      state('void', style({transform: 'translateX(-100%)'})),
      transition(':enter', [
        animate(300, style({transform: 'translateX(0)'}))
      ]),
      transition(':leave', [
        animate(300, style({transform: 'translateX(-100%)'}))
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  public hasDetail: boolean = false;
  public isMobile: boolean;
  private breakpoint: number = 1024;

  constructor(private service: RestaurantService) {
    this.onResize();
  }

  ngOnInit() {
    this.service.currentRestaurant.subscribe(
      (currentRestaurant: Restaurant | undefined) => this.hasDetail = !!currentRestaurant);
  }

  public back() {
    this.service.selectRestaurant(undefined);
  }

  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerWidth < this.breakpoint;
  }
}
