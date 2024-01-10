import { Type } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
// import { max } from 'rxjs';
import { Trips } from 'src/app/classes/trips';
import { Types } from 'src/app/classes/types';
import { TripsServiceService } from 'src/app/services/trips-service.service';
import { TypeServiseService } from 'src/app/services/type-servise.service';

@Component({
  selector: 'app-update-trip',
  templateUrl: './update-trip.component.html',
  styleUrls: ['./update-trip.component.css']
})
export class UpdateTripComponent implements OnInit {
  updateTrip: FormGroup = new FormGroup({})

  constructor(public tripService: TripsServiceService, public ar: ActivatedRoute, public typeService: TypeServiseService) { }
  src: any;
  index: number = 0
  MyTrip: Trips = new Trips()
  inputElse: boolean = false
  newType: Types = new Types()
  shortdate?: string
  editOrAdd: string = "";
  certificate: string = "";

  ngOnInit(): void {
    debugger

    this.ar.params.subscribe(
      p => {
        this.editOrAdd = p["mode"];
        if (this.editOrAdd == 'edit') {
          this.index = p["codeTrip"];
          this.tripService.GetTripById(this.index).subscribe(
            res => {
              console.log(res)
              this.MyTrip = res;
              this.MyTrip.typeName = this.MyTrip.typeName?.replace(" ", "")
              this.shortdate = this.MyTrip.DateTrip?.toString().replace("T00:00:00", "")
              console.log(this.MyTrip)
              if (this.MyTrip.isAidCertificate == false)
                this.certificate = "צריך פרמדיק";
              else this.certificate = "לא צריך פרמדיק";
              this.updateTrip.patchValue(this.MyTrip);
            },
            err => {
              console.log(err)
            }
          )
        }
      }
    )
    this.updateTrip = new FormGroup({
      "CodeTrip": new FormControl(null, [Validators.required]),
      "Target": new FormControl(null, [Validators.required]),
      // "CodeType": new FormControl(null, [Validators.required]),
      "typeName": new FormControl(null, [Validators.required]),
      "DateTrip": new FormControl(null, [Validators.required]),
      "LeavingTime": new FormControl(null, [Validators.required,]),
      "DurationInHour": new FormControl(null, [Validators.required, Validators.min(3), Validators.max(12)]),
      "AvailableSits": new FormControl(null, [Validators.required, Validators.min(0)]),
      "Price": new FormControl(null, [Validators.required, Validators.min(0), Validators.max(1500)]),
      "Picture": new FormControl(null, [Validators.required,]),
      "isAidCertificate": new FormControl(null, [])
    })


    this.typeService.getAllTypes().subscribe(
      res => {
        this.typeService.allTypes = res
      },
      err => {
        alert(err)
      }
    )
  }

  get getCodeTrip() {
    return this.updateTrip.controls['CodeTrip'];
  }

  get getTarget() {
    return this.updateTrip.controls['Target'];
  }

  // get getCodeType() {
  //   return this.updateTrip.controls['CodeType'];
  // }

  get getTypeName() {
    return this.updateTrip.controls['typeName'];
  }

  get getDateTrip() {
    return this.updateTrip.controls['DateTrip'];
  }

  get getLeavingTime() {
    return this.updateTrip.controls['LeavingTime'];
  }

  get getDurationInHour() {
    return this.updateTrip.controls['DurationInHour'];
  }

  get getAvailableSits() {
    return this.updateTrip.controls['AvailableSits'];
  }

  get getPrice() {
    return this.updateTrip.controls['Price'];
  }

  get getPicture() {
    return this.updateTrip.controls['Picture'];
  }

  get getisAidCertificate() {
    return this.updateTrip.controls['isAidCertificate'];
  }

  checkName(letters: FormControl) {
    for (let index = 0; index < String(letters.value).length; index++) {
      if (String(letters.value)[index] < 'א' || String(letters.value)[index] > 'ת')
        return { 'checkName': true }
    }
    return null
  }

  checkNumber(num: FormControl) {
    for (let index = 0; index <= 10; index++)
      if (String(num.value)[index] >= '0' && String(num.value)[index] <= '9')
        return null
    return { 'checkNumber': true }
  }

  checkDate(date: FormControl) {
    if (true)
      return null
    return { 'checkDate': true }
  }

  elsetypetrip() {
    debugger
    if (this.getTypeName.value == "אחר") {
      this.inputElse = true
    }
  }
  max:number=0
  addTypeTrip() {
    debugger
    this.max=0
    this.inputElse = false
    this.newType.NameTrip = this.getTypeName.value
    alert("before")
    this.typeService.allTypes.forEach(element => {
      if(element.Code!>this.max)
      this.max=element.Code!
    });
    this.newType.Code=this.max+1

    this.typeService.addType(this.newType).subscribe(
      res => {
        alert("in")
        this.inputElse = false;
        this.typeService.allTypes.push(this.newType)
        this.MyTrip.typeName = this.MyTrip.typeName?.replace(" ", "")
      },
      err => { console.log(err)
      alert("eror") }
    )

  }

  changesrc() {
    console.log(this.src)
    this.MyTrip.Picture = this.src.toString()
    this.MyTrip.Picture = this.MyTrip.Picture?.replace("C:\\fakepath\\", "").replace(".jpg", "")
  }
  okForm() {
    debugger
    console.log(this.MyTrip)
    alert("after")
    if (this.editOrAdd == 'edit') {
      this.MyTrip.DateTrip = new Date(this.shortdate + "T00:00:00")
      this.MyTrip.CodeType = this.typeService.allTypes.find(x => x.NameTrip!)?.Code
      this.tripService.updateTrip(this.MyTrip).subscribe(
        res => {
          alert("הטיול עודכן בהצלחה");
        },
        err => {
          console.log(err)
        });
    }
    else {
      this.tripService.addTrip(this.MyTrip).subscribe(
        res => {
          alert("הטיול נוסף בהצלחה")
        },
        err => {
          console.log(err)

        });
    }
  }
}
