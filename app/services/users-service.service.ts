import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Users } from '../classes/users';
import { Observable } from 'rxjs';
import { Orders } from '../classes/orders';
import { Trips } from '../classes/trips';

@Injectable({
  providedIn: 'root'
})
export class UsersServiceService {
  isConection:boolean=false
  isManagerConnect:boolean=false
  currentUser:Users=new Users();
  allUsers:Array<Users>=new Array<Users>()
  allOrders: Array<Trips> = new Array<Trips>()
  path:string="https://localhost:44333/api/User/"  

  constructor(public http:HttpClient) {}


  getAllUsers():Observable<Array<Users>>{
    return this.http.get<Array<Users>>(`${this.path}GetAllUsers/`)
  }

  logIn(password:string, email:string):Observable<Users>{
    debugger
     return this.http.get<Users>(`${this.path}GetUserByMailAndPassword/${password}/${email}`)
  }

  addUser(newUser:Users):Observable<number>{
    return this.http.post<number>(`${this.path}AddUser/`,newUser)
  }

  updateUser(newUser:Users):Observable<boolean>{
    return this.http.put<boolean>(`${this.path}UpdateUser/`,newUser)
  }

  deleteUser(userCode:number):Observable<boolean>{
    return this.http.delete<boolean>(`${this.path}DeleteUser/${userCode}`)
  }

  GetAllTripToUser(userCode:number):Observable<Array<Trips>>{
    return this.http.get<Array<Trips>>(`${this.path}GetAllTripToUser/${userCode}`)
  }
}
