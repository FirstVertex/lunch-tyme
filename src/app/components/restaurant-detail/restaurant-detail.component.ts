/// <reference types="@types/googlemaps" />

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.scss']
})
export class RestaurantDetailComponent implements OnInit {
  @ViewChild('gmap') gmapElement: ElementRef;
  public restaurant: Restaurant | undefined;

  constructor(private service: RestaurantService) { }

  ngOnInit() {
    this.service.currentRestaurant.subscribe(
      (currentRestaurant: Restaurant) => {
        this.restaurant = currentRestaurant;
        // need to do this async to allow DOM to be created
        timer(0).subscribe(() => this.updateMap());
      });
  }

  private updateMap() {
    if (this.restaurant) {
      const position = new google.maps.LatLng(this.restaurant.location.lat, this.restaurant.location.lng);
      const mapProp = {
        center: position,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        fullscreenControl: false
      };
      const map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
      new google.maps.Marker({
        position: position,
        map: map,
        title: this.restaurant.name,
        label: this.restaurant.name,
        // red is clashing with our green theme
        icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'});
    }
  }
}
