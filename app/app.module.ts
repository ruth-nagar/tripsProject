import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { OurTripsComponent } from './components/our-trips/our-trips.component';
import { MoreDetailsComponent } from './components/more-details/more-details.component';
import { OrderPlacesComponent } from './components/order-places/order-places.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { LogInComponent } from './components/log-in/log-in.component';
import { OurUsersComponent } from './components/our-users/our-users.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AllTripsComponent } from './components/all-trips/all-trips.component';
import { PersonalAreaComponent } from './components/personal-area/personal-area.component';
import { UpdateTripComponent } from './components/update-trip/update-trip.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    OurTripsComponent,
    MoreDetailsComponent,
    OrderPlacesComponent,
    LogInComponent,
    OurUsersComponent,
    AllTripsComponent,
    PersonalAreaComponent,
    UpdateTripComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
