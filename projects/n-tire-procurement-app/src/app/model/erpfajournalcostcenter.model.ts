export class erpfajournalcostcenter {
    public jdetailid: number; public journalid: number; public costcenterid: number; public costcenteriddesc: string; public percentageshare: number; public amount: string; public status: string;
    constructor() { }
}
export interface IerpfajournalcostcenterResponse {
    total: number;
    results: erpfajournalcostcenter[];
}

