import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Trips } from 'src/app/classes/trips';
import { Types } from 'src/app/classes/types';
import { TripsServiceService } from 'src/app/services/trips-service.service';
import { UsersServiceService } from 'src/app/services/users-service.service';

@Component({
  selector: 'app-our-trips',
  templateUrl: './our-trips.component.html',
  styleUrls: ['./our-trips.component.css']
})
export class OurTripsComponent implements OnInit {

  constructor(public tripService: TripsServiceService, public r: Router) { }
  ngOnInit(): void {
    this.tripService.getAllTrips().subscribe(
      res => {
        this.tripService.allTrips = res
      },
      err => {
        console.log(err);
      }
    )
  }
  mytrips: Array<Trips> = new Array<Trips>();
  filterPast() {
    this.mytrips = this.tripService.allTrips.filter(x => new Date(x.DateTrip || 0) < new Date())
  }
  filtertoday() {
    this.mytrips = this.tripService.allTrips.filter(x => new Date(x.DateTrip || 0) == new Date())
  }
  filterweek() {
    this.filterFuture()
    this.mytrips = this.mytrips.filter(x => new Date(x.DateTrip || 0).getMonth() == new Date().getMonth())
    this.mytrips = this.mytrips.filter(x => new Date(x.DateTrip || 0).getDay() + 7 <= new Date().getDay())

  }
  filtermounth() {
    this.filterFuture()
    this.mytrips = this.mytrips.filter(x => new Date(x.DateTrip || 0).getMonth() == new Date().getMonth())
  }
  filterFuture() {
    this.mytrips = this.tripService.allTrips.filter(x => new Date(x.DateTrip || 0) > new Date())
  }

  edittrip(code?: number) {
    this.r.navigate(["/EditOrAdd/edit/" + code?.toString()])
  }
}
