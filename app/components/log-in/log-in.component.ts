import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from 'src/app/classes/users';
import { UsersServiceService } from 'src/app/services/users-service.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  signInForm: FormGroup = new FormGroup({})
  password: string = "";
  mail: string = "";
  constructor(public loc: Location, public router: Router, public userService: UsersServiceService) { }

  ngOnInit(): void {
    this.signInForm = new FormGroup({
      "userEmail": new FormControl(null, [Validators.required, Validators.pattern("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$")]),
      "userPassword": new FormControl(null, [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,100}$")])
    })
    localStorage.setItem("managerEmail", "manager@gmail.com")
    localStorage.setItem("managerPassword", "Manager1234")
  }

  get getUserEmail() {
    return this.signInForm.controls['userEmail'];
  }

  get getUserPassword() {
    return this.signInForm.controls['userPassword'];
  }

  existUser() {
    debugger
    this.userService.logIn(this.password, this.mail).subscribe(
      res => {
        if (res != null) {
          this.userService.currentUser = res
          this.userService.isConection = true;
          this.router.navigate(['/allTrips']);
          alert(this.userService.currentUser.UserFirstName)
        }
        else {
          if (this.mail == localStorage.getItem("managerEmail") && this.password == localStorage.getItem("managerPassword")) {
            this.userService.isConection = true;
            this.userService.isManagerConnect = true
            this.router.navigate(['/ourTrips']);
          }

        }
      },
      err => {
        alert("אינך קיים במערכת, עליך להרשם תחילה...")
      })

  }

}

