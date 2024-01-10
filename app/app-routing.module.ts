import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AllTripsComponent } from './components/all-trips/all-trips.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { MoreDetailsComponent } from './components/more-details/more-details.component';
import { OrderPlacesComponent } from './components/order-places/order-places.component';
import { OurTripsComponent } from './components/our-trips/our-trips.component';
import { OurUsersComponent } from './components/our-users/our-users.component';
import { PersonalAreaComponent } from './components/personal-area/personal-area.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { UpdateTripComponent } from './components/update-trip/update-trip.component';

const routes: Routes = [
  {path:'logIn',component:LogInComponent},
  {path:'signIn',component:SignInComponent},
  {path:'allTrips',component:AllTripsComponent,children:[
    {path:'moreDetails/:codeTrip',component:MoreDetailsComponent},
  ]},
  {path:'ourTrips',component:OurTripsComponent,children:[
    {path:'moreDetails/:codeTrip',component:MoreDetailsComponent},
  ]},
  {path:'orderPlaces/:codeTrip',component:OrderPlacesComponent},
  {path:'ourUsers',component:OurUsersComponent},
  {path:'personalArea',component:PersonalAreaComponent},
  {path:'EditOrAdd/:mode/:codeTrip',component:UpdateTripComponent},
  {path:'EditOrAdd/:mode',component:UpdateTripComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
