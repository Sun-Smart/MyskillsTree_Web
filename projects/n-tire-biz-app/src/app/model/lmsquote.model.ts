export class lmsquote {
    public branchid: number; public leadid: number; public opportunityid: number; public opportunityiddesc: string; public quoteiddesc: string; public quoteid: number; public reference: string; public quotedate: Date; public details: string; public assignedto: string; public quoteamount: number; public currency: string; public currencydesc: string; public expirationdate: Date; public taxid: number; public taxiddesc: string; public shippingruleid: number; public totalamount: number; public taxamount: number; public charges: number; public paymenttermid: number; public paymenttermiddesc: string; public termid: number; public termiddesc: string; public terms: string; public comments: string; public campaignid: number; public leadsource: string; public leadsourcedesc: string; public supplierquotationid: number; public customfield: string; public attachment: string; public quotestatus: string; public quotestatusdesc: string; public status: string; public Deleted_lmsquotedetail_IDs: string; public Deleted_lmsquotepaymentterm_IDs: string;
    constructor() { }
}
export interface IlmsquoteResponse {
    total: number;
    results: lmsquote[];
}

