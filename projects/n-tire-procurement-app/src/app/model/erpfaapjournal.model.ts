export class erpfaapjournal {
    public apjid: number; public apbid: number; public cdid: number; public amountraised: number; public invoiceamount: number; public cdamount: number; public amountreceivable: number; public receiptmode: string; public receiptmodedesc: string; public reference: string; public referencedate: Date; public narration: string; public status: string;
    constructor() { }
}
export interface IerpfaapjournalResponse {
    total: number;
    results: erpfaapjournal[];
}

