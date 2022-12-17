export class erpfareceipt {
    public receiptid: number; public receiptdate: Date; public receiptreference: string; public customerid: number; public customeriddesc: string; public receivedamount: number; public bankaccountid: number; public bankaccountiddesc: string; public receiptmode: string; public chequeno: string; public chequedate: Date; public narration: string; public status: string; public customerpaymentreference: string; public DeletederpfareceiptdetailIDs: string;
    constructor() { }
}
export interface IerpfareceiptResponse {
    total: number;
    results: erpfareceipt[];
}

