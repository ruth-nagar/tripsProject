export class Users{
   
    constructor(public UserCode?:number, public UserFirstName?:string, public UserLastName?:string,public UserPhone?:string,
        public UserEmail?:string,public Password?:string, public FirstAidCertificate?: boolean) 
    { }
}
