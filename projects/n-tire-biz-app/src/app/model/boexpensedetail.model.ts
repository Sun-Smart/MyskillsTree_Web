export class boexpensedetail {
    public expenseid: number; public expensedetailiddesc: string; public expensedetailid: number; public sourcefield: string; public sourcereference: number; public item: number; public description: string; public amount: number; public costcenterid: number; public notes: string; public attachment: string; public status: string;
    constructor() { }
}
export interface IboexpensedetailResponse {
    total: number;
    results: boexpensedetail[];
}

