import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Trips } from 'src/app/classes/trips';
import { TripsServiceService } from 'src/app/services/trips-service.service';
import { TypeServiseService } from 'src/app/services/type-servise.service';

@Component({
  selector: 'app-all-trips',
  templateUrl: './all-trips.component.html',
  styleUrls: ['./all-trips.component.css']
})
export class AllTripsComponent implements OnInit {

  constructor(public tripService:TripsServiceService,public typesServise:TypeServiseService,public scroller:ViewportScroller) { }
  choosen:string=""
  allTrips:Array<Trips>=new Array<Trips>()
  ngOnInit(): void {
    this.scroller.scrollToAnchor("alltrip")
    this.tripService.getAllTrips().subscribe(
      res=>{
        this.tripService.allTrips=res
        this.tripService.allTrips=this.tripService.allTrips.filter(x=>new Date(x.DateTrip||0)>new Date())
        this.allTrips=this.tripService.allTrips
        console.log(this.allTrips);
      },
      err=>{
        console.log(err);
      }
    )

    this.typesServise.getAllTypes().subscribe(
      res=>{
        this.typesServise.allTypes=res
      console.log(  this.typesServise.allTypes)
      },
      err=>{
        console.log(err);
      }
    )
  }

  filter(){
    this.allTrips=this.tripService.allTrips.filter(x=>x.typeName?.includes(this.choosen))
    console.log(this.allTrips)
    if(this.choosen=="כל הטיולים")
        this.allTrips=this.tripService.allTrips
  }
}
