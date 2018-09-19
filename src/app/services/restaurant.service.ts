import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Restaurant } from 'src/app/models/restaurant';
import { appConfig } from 'src/app/app.config';

interface GetRestaurantResponse {
  restaurants: Restaurant[];
}

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  public restaurants: BehaviorSubject<Restaurant[]>;
  public currentRestaurant: BehaviorSubject<Restaurant | undefined>;

  constructor(private http: HttpClient) {
    this.restaurants = new BehaviorSubject<Restaurant[]>([]);
    this.currentRestaurant = new BehaviorSubject<Restaurant | undefined>(undefined);
    this.fetch();
  }

  public fetch() {
    this.http.get<GetRestaurantResponse>(appConfig.restaurants_host).subscribe((result: GetRestaurantResponse) => {
      this.restaurants.next(result.restaurants);
    });
  }

  public selectRestaurant(restaurant: Restaurant | undefined) {
    this.currentRestaurant.next(restaurant);
  }
}
