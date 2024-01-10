import { Injectable } from '@angular/core';
import { Type } from '@angular/compiler';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Types } from '../classes/types';

@Injectable({
  providedIn: 'root'
})
export class TypeServiseService {
  typePath:string="https://localhost:44333/api/Types/"
  allTypes:Array<Types>=new Array<Types>()

  constructor(public http:HttpClient) { }

  getAllTypes():Observable<Array<Types>>{
    return this.http.get<Array<Types>>(`${this.typePath}GetAllTypes/`)
  }

  addType(newType:Types):Observable<number>{
    return this.http.post<number>(`${this.typePath}AddType/`,newType)
  }
}
