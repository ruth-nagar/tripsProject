import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/classes/users';
import { UsersServiceService } from 'src/app/services/users-service.service';

@Component({
  selector: 'app-our-users',
  templateUrl: './our-users.component.html',
  styleUrls: ['./our-users.component.css']
})
export class OurUsersComponent implements OnInit {
  constructor(public userService:UsersServiceService) { }
  LU:Array<Users>=new Array<Users>()
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      res=>{
        console.log(res)
        this.userService.allUsers=res
      },
      err=>{
        console.log(err);
      }
    )
  }

}
