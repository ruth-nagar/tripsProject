import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from 'src/app/classes/users';
import { UsersServiceService } from 'src/app/services/users-service.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  logInForm: FormGroup = new FormGroup({})
  user: Users = new Users()
  @Input() isEdit = false;
  constructor(public loc: Location, public router: Router, public userService: UsersServiceService) { }

  ngOnInit(): void {
    this.logInForm = new FormGroup({
      "UserFirstName": new FormControl(null, [Validators.required, this.checkName.bind(this)]),
      "UserLastName": new FormControl(null, [Validators.required, this.checkName.bind(this)]),
      "UserPhone": new FormControl(null, [Validators.required, this.checkPhoneNumbers.bind(this), this.checkPhoneLength.bind(this)]),
      "UserEmail": new FormControl(null, [Validators.required, Validators.pattern("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$")]),
      "Password": new FormControl(null, [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,100}$")]),
      "FirstAidCertificate": new FormControl(null, [Validators.required]),
    })
    if (this.isEdit) {
      this.logInForm.patchValue(this.userService.currentUser);
    }
  }

  get getFirstName() {
    return this.logInForm.controls['UserFirstName'];
  }

  get getLastName() {
    return this.logInForm.controls['UserLastName'];
  }

  get getPhoneNumber() {
    return this.logInForm.controls['UserPhone'];
  }

  get getEmailAddress() {
    return this.logInForm.controls['UserEmail'];
  }

  get getPassword() {
    return this.logInForm.controls['Password'];
  }

  get getAidFirstCartificate() {
    return this.logInForm.controls['FirstAidCertificate'];
  }

  checkName(letters: FormControl) {
    for (let index = 0; index < String(letters.value).length; index++) {
      if (String(letters.value)[index] < 'א' || String(letters.value)[index] > 'ת')
        return { 'checkName': true }
    }
    return null
  }

  checkPhoneNumbers(phoneNumber: FormControl) {
    for (let index = 0; index <= 10; index++)
      if (String(phoneNumber.value)[index] >= '0' && String(phoneNumber.value)[index] <= '9')
        return null
    return { 'checkPhoneNumbers': true }
  }

  checkPhoneLength(phoneNumber: FormControl) {
    if (String(phoneNumber.value).length == 10)
      return null
    return { 'checkPhoneLength': true }
  }

  okForm() {
    debugger
    this.user.UserCode=this.userService.currentUser.UserCode
    this.user.UserFirstName = this.getFirstName.value
    this.user.UserLastName = this.getLastName.value
    this.user.UserPhone = this.getPhoneNumber.value
    this.user.UserEmail = this.getEmailAddress.value
    this.user.Password = this.getPassword.value
    this.user.FirstAidCertificate = this.getAidFirstCartificate.value
    // this.userService.currentUser!=this.logInForm.value
    if (this.isEdit) {
      this.userService.updateUser(this.user).subscribe(
        res => {
          this.router.navigate(['/allTrips'])
        },
        err => {
          alert("err")
        }
      )
    }
    else {
      this.userService.addUser(this.user).subscribe(
        res => {
          this.userService.isConection = true
          this.userService.currentUser=this.user
          this.router.navigate(['/allTrips'])
        },
        err => { console.log(err); }
      )
    }
  }

}
