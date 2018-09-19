import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { Restaurant } from '../../models/restaurant';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit {
  public restaurants: Restaurant[] = [];
  public selectedRestaurantName: string;

  constructor(private service: RestaurantService) { }

  ngOnInit() {
    this.service.restaurants.subscribe(
      (restaurants: Restaurant[]) => this.restaurants = restaurants);
    this.service.currentRestaurant.subscribe(
      (currentRestaurant: Restaurant) => this.selectedRestaurantName = currentRestaurant ? currentRestaurant.name : '');
  }

  public selectRestaurant(restaurant: Restaurant) {
    this.service.selectRestaurant(restaurant);
  }
}
