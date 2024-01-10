export class Trips{
    constructor(public CodeTrip?:number, public Target?:string,public CodeType?:number, public DateTrip?:Date, public LeavingTime?:string,
        public DurationInHour?:number,public AvailableSits?:number, public Price?:number, public Picture?:string,public typeName?:string,
        public isAidCertificate?:boolean)
    { }
}
