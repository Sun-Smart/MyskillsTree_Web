export class flmaccident {
    public accidentid: number; public vehicleid: number; public description: string; public accidentdetails: string; public driverid: number; public driveriddesc: string; public learnerlicense: boolean; public licenseno: string; public rto: string; public copassengerdetails: string; public goodscarried: string; public accidenttype: string; public accidentplace: string; public accidentdate: Date; public accidenttime: string; public policereportlodged: boolean; public policestationname: string; public firno: string; public insuranceid: number; public claimdate: Date; public claimamount: number; public amountreceived: number; public comments: string; public attachment: string; public status: string;
    constructor() { }
}
export interface IflmaccidentResponse {
    total: number;
    results: flmaccident[];
}

