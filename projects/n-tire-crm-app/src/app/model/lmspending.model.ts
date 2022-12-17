export class lmspending {
    public branchid: number; public branchiddesc: string; public branchlocationid: number; public branchlocationiddesc: string; public leadid: number; public leadiddesc: string; public opportunityid: number; public callid: number; public productid: number; public productiddesc: string; public campaignid: number; public campaigniddesc: string; public leadby: number; public leadbydesc: string; public currentowner: number; public currentownerdesc: string; public leadresponse: string; public leadresponsedesc: string; public nextcalldate: Date; public nextaction: string; public nextactiondesc: string; public actiondatetime: Date; public previousremarks: string; public leadscore: number; public source: string; public sourcedesc: string; public stage: string; public stagedesc: string; public criticality: string; public criticalitydesc: string; public expectedcloseby: Date; public expectedvalue: string; public attachment: string; public customfield: string; public status: string; public DeletedlmstaskIDs: string; public DeletedlmsreminderIDs: string; public DeletedlmshistoryIDs: string;
    constructor() { }
}
export interface IlmspendingResponse {
    total: number;
    results: lmspending[];
}

