export class erpfapayment {
    public paymentiddesc: string; public paymentid: number; public paymentdate: Date; public paymentreference: string; public vendorid: number; public vendoriddesc: string; public totalpayable: string; public approvedamount: string; public bankaccountid: number; public bankaccountiddesc: string; public paymentmode: string; public instrumentno: string; public instrumentdate: Date; public narration: string; public receiptreference: string; public transactiondate: Date; public paymenttype: string; public transactionreference: string; public bankstatus: string; public customfield: string; public attachment: string; public status: string; public DeletederpfapaymentdetailIDs: string;
    constructor() { }
}
export interface IerpfapaymentResponse {
    total: number;
    results: erpfapayment[];
}

