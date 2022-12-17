export class erpfaapentry {
    public apbid: number; public poreference: number; public paymenttype: string; public paymenttypedesc: string; public vendorid: number; public invoicedate: Date; public invoiceamount: number; public taxdeduction: number; public tax1: number; public tax2: number; public payable: number; public approvedamount: number; public supplierinvoiceid: number; public assigntofinanceuserid: number; public assigntofinanceuseriddesc: string; public status: string; public DeletederpfaapjournalIDs: string;
    constructor() { }
}
export interface IerpfaapentryResponse {
    total: number;
    results: erpfaapentry[];
}

