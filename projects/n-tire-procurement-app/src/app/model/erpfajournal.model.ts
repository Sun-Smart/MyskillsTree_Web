export class erpfajournal {
    public journalid: number; public branchid: number; public branchiddesc: string; public type: string; public typedesc: string; public reference: string; public journaldate: Date; public journalcode: string; public mode: string; public modedesc: string; public category: string; public categorydesc: string; public otherreference: string; public narration: string; public cdreference: string; public cdamount: number; public bank: number; public bankdesc: string; public chequenumber: number; public status: string; public DeletederpfajournaldetailIDs: string; public DeletederpfajournalcostcenterIDs: string;
    constructor() { }
}
export interface IerpfajournalResponse {
    total: number;
    results: erpfajournal[];
}

