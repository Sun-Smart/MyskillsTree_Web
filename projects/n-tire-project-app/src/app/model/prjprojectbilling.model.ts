export class prjprojectbilling {
    public billiddesc: string; public billid: number; public billreference: string; public projectid: number; public totalworkinghrs: number; public totalbillablehrs: number; public totalbillableamount: number; public totalcostingamount: number; public notes: string; public status: string; public DeletedprjprojectbillingdetailIDs: string;
    constructor() { }
}
export interface IprjprojectbillingResponse {
    total: number;
    results: prjprojectbilling[];
}

