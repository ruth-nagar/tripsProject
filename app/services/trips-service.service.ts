import { HttpClient } from '@angular/common/http';
import { Type } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orders } from '../classes/orders';
import { Trips } from '../classes/trips';

@Injectable({
  providedIn: 'root'
})
export class TripsServiceService {
  TripPath:string="https://localhost:44333/api/Trip/"
  allTrips:Array<Trips>=new Array<Trips>()
  myTrip:Trips=new Trips()
  order:Orders=new Orders()
  allOrders:Array<Orders>=new Array<Orders>()
  constructor(public http:HttpClient) { }

  getAllTrips():Observable<Array<Trips>>{
    return this.http.get<Array<Trips>>(`${this.TripPath}GetAllTrips/`)
  }

  GetTripById(id:number):Observable<Trips>{
    return this.http.get<Trips>(`${this.TripPath}GetTripById/${id}`)
  }

  GetInvitesToTripById(id:number):Observable<Array<Orders>>{
    return this.http.get<Array<Orders>>(`${this.TripPath}GetInvitesToTripById/${id}`)
  }

  AddInviteToTrip(newOrder:Orders):Observable<number>{
    return this.http.post<number>(`${this.TripPath}AddInviteToTrip/`,newOrder)
  }

  updateTrip(newTrip:Trips):Observable<boolean>{
    return this.http.put<boolean>(`${this.TripPath}UpdateTrip/`,newTrip)
  }

  addTrip(newTrip:Trips):Observable<number>{
    return this.http.post<number>(`${this.TripPath}AddTrip/`,newTrip)
  }
}
