export class erpfaarbooking {
    public arbid: number; public soreference: string; public invoicereference: string; public invoicedate: Date; public customerid: number; public customeriddesc: string; public invoiceamount: number; public creditdays: number; public plannedreceipt: Date; public status: string; public statusdesc: string; public DeletederpfaarjournalIDs: string;
    constructor() { }
}
export interface IerpfaarbookingResponse {
    total: number;
    results: erpfaarbooking[];
}

