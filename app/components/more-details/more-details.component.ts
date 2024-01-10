import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Trips } from 'src/app/classes/trips';
import { Location } from '@angular/common';
import { TripsServiceService } from 'src/app/services/trips-service.service';

@Component({
  selector: 'app-more-details',
  templateUrl: './more-details.component.html',
  styleUrls: ['./more-details.component.css']
})
export class MoreDetailsComponent implements OnInit {

  constructor(public ar: ActivatedRoute, public loc: Location,public tripServise:TripsServiceService) { }
  index: number = 0
  MyTrip: Trips = new Trips()
  ngOnInit(): void {
    this.ar.params.subscribe(
      p => {
        this.index=this.tripServise.allTrips.findIndex(x=>x.CodeTrip==p["codeTrip"])
        this.MyTrip =this.tripServise.allTrips[this.index]
      }
    )
  }

  backMe() {
    this.loc.back()
  }
}
