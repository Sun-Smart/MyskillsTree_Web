export class lmsproduct {
    public branchid: number; public leadid: number; public leadiddesc: string; public opportunityid: number; public productid: number; public productiddesc: string; public campaignid: number; public campaigniddesc: string; public source: string; public sourcedesc: string; public leadby: number; public leadbydesc: string; public creationdate: Date; public genericcustomfield: string; public productcustomfield: string; public status: string; public DeletedlmspendingIDs: string; public DeletedlmsreminderIDs: string; public DeletedlmssecondarycontactIDs: string;
    constructor() { }
}
export interface IlmsproductResponse {
    total: number;
    results: lmsproduct[];
}

