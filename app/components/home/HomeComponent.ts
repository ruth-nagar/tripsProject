import { Component, OnInit } from '@angular/core';
import { UsersServiceService } from 'src/app/services/users-service.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // @Output() userOrManager = new EventEmitter()
  constructor(public userService: UsersServiceService) { }
  isConection: boolean = this.userService.isConection;
  ngOnInit(): void {
  }
}
