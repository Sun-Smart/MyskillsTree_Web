export class prjprojectbillingdetail {
    public billdetailiddesc: string; public billdetailid: number; public billid: number; public timecardid: number; public projectid: number; public deliverableid: number; public taskid: number; public userid: number; public useriddesc: string; public startdate: Date; public todate: Date; public totalhours: number; public billableamount: number; public notes: string; public status: string;
    constructor() { }
}
export interface IprjprojectbillingdetailResponse {
    total: number;
    results: prjprojectbillingdetail[];
}

