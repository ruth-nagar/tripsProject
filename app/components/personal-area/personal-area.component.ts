import { Component, OnInit } from '@angular/core';
import { Orders } from 'src/app/classes/orders';
import { Trips } from 'src/app/classes/trips';
import { Users } from 'src/app/classes/users';
import { OrdersServiceService } from 'src/app/services/orders-service.service';
import { UsersServiceService } from 'src/app/services/users-service.service';

@Component({
  selector: 'app-personal-area',
  templateUrl: './personal-area.component.html',
  styleUrls: ['./personal-area.component.css']
})
export class PersonalAreaComponent implements OnInit {
  myDetails: boolean = false
  myOrders: boolean = false
  choosen: string = ""
  choosenType:string=""
  priceChoose: string = ""
  allMyTrip: Array<Trips> = new Array<Trips>()
  constructor(public usersService: UsersServiceService, public orderService: OrdersServiceService) { }

  ngOnInit(): void {
    debugger
    this.usersService.GetAllTripToUser(this.usersService.currentUser.UserCode!).subscribe(
      res => {
        this.usersService.allOrders = res
        this.allMyTrip = res
      },
      err => {
        alert(err)
      }
    )
  }

  personalDetails() {
    this.myDetails = true
  }

  AllmyOrders() {
    this.myOrders = true
  }

  deleteUser() {
    debugger
    if (this.usersService.allOrders.length == 0) {
      this.usersService.deleteUser(this.usersService.currentUser.UserCode!).subscribe(
        res => {
          alert("משתמש נמחק בהצלחה")
          this.usersService.currentUser = new Users()
          this.usersService.isConection = false
        },
        err => {
          alert("שגיאה במחיקת משתמש")
        }
      )
    }
    else {
      alert("עליך לבטל הרשמה לטיולים קודם ביטול הרישום")
    }
  }

  filterNowAndThen() {
    if (this.choosen.includes("עבר"))
      this.allMyTrip = this.usersService.allOrders.filter(x => new Date(x.DateTrip! || 0) < new Date())
    else if (this.choosen.includes("עתיד"))
      this.allMyTrip = this.usersService.allOrders.filter(x => new Date(x.DateTrip! || 0) > new Date())
    else this.allMyTrip = this.usersService.allOrders
  }

  filterByPrice() {
    if (this.priceChoose.includes("מהנמוך"))
      this.allMyTrip=this.usersService.allOrders.sort((x,y)=>x.Price!-y.Price!)
    else this.allMyTrip=this.usersService.allOrders.sort((y,x)=>x.Price!-y.Price!)
  }
}
