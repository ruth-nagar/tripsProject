import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orders } from '../classes/orders';

@Injectable({
  providedIn: 'root'
})
export class OrdersServiceService {
  path: string = "https://localhost:44333/api/Trip/"

  constructor(public http: HttpClient) { }
  getAllToTrip(id: number): Observable<Array<Orders>> {
    return this.http.get<Array<Orders>>(`${this.path}getAllToTrip/${id}`)
  }

}
