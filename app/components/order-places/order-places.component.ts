import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Trips } from 'src/app/classes/trips';
import { Orders } from 'src/app/classes/orders';
import { Location } from '@angular/common';
import { TripsServiceService } from 'src/app/services/trips-service.service';
import { OrdersServiceService } from 'src/app/services/orders-service.service';
import { UsersServiceService } from 'src/app/services/users-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-places',
  templateUrl: './order-places.component.html',
  styleUrls: ['./order-places.component.css']
})
export class OrderPlacesComponent implements OnInit {
  formOrders: FormGroup = new FormGroup({})

  constructor(public ar: ActivatedRoute, public loc: Location, public tripServise: TripsServiceService, public userService: UsersServiceService) { }
  code: number = 0
  MyTrip: Trips = new Trips()
  order: Orders = new Orders()
  sumPlaces: number = 0

  ngOnInit(): void {
    this.formOrders = new FormGroup({
      "countOfPlaces": new FormControl(null, [Validators.required, Validators.min(0), Validators.max(this.MyTrip.AvailableSits!)])
    })
    this.ar.params.subscribe(
      p => {
        this.code = p["codeTrip"]
        this.tripServise.GetTripById(this.code).subscribe(
          res => {
            this.tripServise.myTrip = res
          },
          err => {
            alert(err)
          }
        )
      }
    )
  }

  get getCountOfPlaces() {
    return this.formOrders.controls['countOfPlaces'];
  }

  okForm() {
    this.order.orderCode=100
    this.order.tripCode = this.code
    this.order.orderDate = new Date()
    this.order.orderHour = new Date()
    this.order.target = this.tripServise.myTrip.Target
    this.order.userCode = this.userService.currentUser.UserCode
    this.order.fullName = String(this.userService.currentUser.UserFirstName) + String(this.userService.currentUser.UserLastName)
    this.order.userPhone = this.userService.currentUser.UserPhone
    this.order.countOfPlaces = this.getCountOfPlaces.value
    if (this.userService.isConection) {
      debugger
      this.tripServise.AddInviteToTrip(this.order).subscribe(
        res => {
          alert("ההזמנה בוצעה בהצלחה");
          this.order.orderCode = res
          this.loc.back()
        },
        err => {
          alert("לא ניתן לבצע הזמנה לטיול זה")
          console.log(err);
        }
      )
    }
    else {
      alert("אינך יכול להרשם לטיול, עליך להכנת לאתר תחילה")
    }

  }
}
