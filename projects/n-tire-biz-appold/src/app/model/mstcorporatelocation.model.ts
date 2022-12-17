export class mstcorporatelocation {
    public locationiddesc: string; public locationid: number; public corporateid: number; public branchid: number;public branchdesc: string; public countryid: number; public countryiddesc: string; public stateid: number; public stateiddesc: string; public cityid: number; public cityiddesc: string; public address1: string; public address2: string; public pincode: string; public contactperson: string; public designation: string; public emailid: string; public mobile: string; public status: string;
    constructor() { }
}
export interface ImstcorporatelocationResponse {
    total: number;
    results: mstcorporatelocation[];
}

