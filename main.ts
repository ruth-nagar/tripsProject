import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { Orders } from './app/classes/orders';
import { Users } from './app/classes/users';
import { environment } from './environments/environment';
import { Trips } from './app/classes/trips';
import { Types } from './app/classes/types';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

// export const allUsers:Array<Users>=[
//   new Users(1,"yael","nagar","0504105737","yaelnagar5737@gmail.com","y5737",true),
//   new Users(2,"ruth","cohen","05331487782","ruth7782@gmail.com","r7782",true),
//   new Users(3,"michal","yaakov","0504112466","michal2466@gmail.com","m2466",false),
//   new Users(4,"yaakov","moshe","0527645122","yaakov5122@gmail.com","y5122",false),
//   new Users(5,"maor","levi","0586655421","maor5421@gmail.com","m5421",false),
//   new Users(6,"natan","sharvit","0533145986","natan5986@gmail.com","n5986",false),
//   new Users(7,"noa","lugasi","0552233669","noa3669@gmail.com","n3669",true),
//   new Users(8,"menachem","chezi","0542583697","menachem3697@gmail.com","m3697",true),
//   new Users(8,"mordechay","maman","0504498822","mordechay8822@gmail.com","m8822",false),
//   new Users(9,"nitay","vaknin","0556642139","nitay2139@gmail.com","n2139",false),
//   new Users(10,"adar","dayan","0501234485","adar4485@gmail.com","a4485",true)
// ]

// export const allOrders:Array<Orders>=[
//   new Orders(1,1,new Date(1,5,2021),"14:07",4,2),
//   new Orders(2,4,new Date(2,7,2022),"08:01",2,7),
//   new Orders(3,7,new Date(20,12,2022),"10:39",5,5),
//   new Orders(4,5,new Date(9,5,2022),"12:58",1,3),
//   new Orders(5,9,new Date(1,11,2022),"22:08",2,4),
//   new Orders(6,5,new Date(12,10,2022),"16:52",5,2),
//   new Orders(7,8,new Date(18,3,2022),"19:32",3,6),
//   new Orders(8,1,new Date(5,2,2021),"10:46",4,7),
//   new Orders(9,9,new Date(25,9,2022),"08:48",3,2),
//   new Orders(10,10,new Date(31,11,2022),"15:27",1,5)
// ]

// export const allTrips:Array<Trips>=[
//   new Trips(1,"zhfat",1,new Date(25,12,2022),"14:00",6,42,150,"assets/images/01.jpg"),
//   new Trips(2,"tveria",2,new Date(15,1,2023),"08:00",10,39,200,"/assets/images/01.jpg"),
//   new Trips(3,"elat",2,new Date(25,2,2023),"07:00",12,42,350,"/assets/images/01.jpg"),
//   new Trips(4,"jerusalem",1,new Date(1,1,2023),"10:00",5,41,100,"/assets/images/01.jpg"),
//   new Trips(5,"netivot",1,new Date(5,1,2023),"09:00",7,43,75,"/assets/images/01.jpg")
// ]

// export const allTypes:Array<Types>=[
//   new Types(1,"kivrey zhadikim"),
//   new Types(2,"water parks"),
// ]