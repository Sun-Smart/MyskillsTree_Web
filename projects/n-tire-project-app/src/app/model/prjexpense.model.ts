export class prjexpense {
    public expenseiddesc: string; public expenseid: number; public expensedate: Date; public projectid: number; public requesteduserid: number; public requesteduseriddesc: string; public expensecategory: string; public expensecategorydesc: string; public expensedescription: string; public currency: string; public currencydesc: string; public amount: number; public tax: number; public othercharges: number; public totalamount: number; public reimbursedamount: number; public reimburseddate: Date; public basecurrency: string; public basecurrencydesc: string; public baseamount: number; public notes: string; public costcenterid: number; public customfield: string; public attachment: string; public status: string;
    constructor() { }
}
export interface IprjexpenseResponse {
    total: number;
    results: prjexpense[];
}

