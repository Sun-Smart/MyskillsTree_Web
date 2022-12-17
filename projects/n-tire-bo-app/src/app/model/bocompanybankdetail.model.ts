export class bocompanybankdetail {
    constructor(public bankid: number, public bankname: string, public accountnumber: string, public ibancode: string, public swiftcode: string, public otherreferences: string, public bankcurrency: string, public bankcurrencyDesc: string, public bankaddress1: string, public bankaddress2: string, public bankcountry: number, public bankcountryDesc: string, public bankstate: number, public bankstateDesc: string, public bankcity: number, public bankcityDesc: string, public bankpin: string, public banklatlong: string, public status: string) { }
}
export interface IbocompanybankdetailResponse {
    total: number;
    results: bocompanybankdetail[];
}

