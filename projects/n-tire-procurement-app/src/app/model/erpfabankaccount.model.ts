export class erpfabankaccount {
    public bankaccountid: number; public accountid: number; public accountiddesc: string; public ifsccode: string; public accountnumber: string; public swiftcode: string; public address1: string; public address2: string; public countryid: number; public countryiddesc: string; public stateid: number; public stateiddesc: string; public cityid: number; public cityiddesc: string; public pincode: string; public contactperson: string; public designation: string; public mobile: string; public email: string; public status: string;
    constructor() { }
}
export interface IerpfabankaccountResponse {
    total: number;
    results: erpfabankaccount[];
}

