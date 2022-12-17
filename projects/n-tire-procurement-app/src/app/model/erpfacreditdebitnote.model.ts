export class erpfacreditdebitnote {
    public cdid: number; public cdcode: string; public type: string; public typedesc: string; public journalid: number; public journaliddesc: string; public journalamount: number; public cdamount: number; public cdremarks: string; public status: string;
    constructor() { }
}
export interface IerpfacreditdebitnoteResponse {
    total: number;
    results: erpfacreditdebitnote[];
}

