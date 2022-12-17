export class erpfaarjournal {
    public arjid: number; public arbid: number; public cdid: number; public cdiddesc: string; public amountraised: number; public invoiceamount: number; public cdamount: number; public amountreceivable: number; public receiptmode: string; public receiptmodedesc: string; public reference: string; public referencedate: Date; public narration: string; public status: string;
    constructor() { }
}
export interface IerpfaarjournalResponse {
    total: number;
    results: erpfaarjournal[];
}

