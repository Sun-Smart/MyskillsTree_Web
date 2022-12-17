export class lmsquotedetail {
    public branchid: number; public leadid: number; public opportunityid: number; public opportunityiddesc: string; public quoteid: number; public quotedetailiddesc: string; public quotedetailid: number; public productid: number; public productiddesc: string; public quantity: number; public uom: string; public uomdesc: string; public price: number; public totalprice: number; public status: string;
    constructor() { }
}
export interface IlmsquotedetailResponse {
    total: number;
    results: lmsquotedetail[];
}

