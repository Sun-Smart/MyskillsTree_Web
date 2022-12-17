export class flmexpense {
    public expenseid: number; public vehicleid: number; public description: string; public expensetype: string; public expensedate: Date; public amount: number; public vendorid: number; public vendoriddesc: string; public remarks: string; public customfield: string; public attachment: string; public status: string;
    constructor() { }
}
export interface IflmexpenseResponse {
    total: number;
    results: flmexpense[];
}

