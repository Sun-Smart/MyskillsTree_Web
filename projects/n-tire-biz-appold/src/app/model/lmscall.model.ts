export class lmscall {
    public branchid: number; public branchiddesc: string; public branchlocationid: number; public branchlocationiddesc: string; public eventdate: Date; public eventtime: string; public eventenddate: Date; public eventendtime: string; public leadid: number; public leadiddesc: string; public opportunityid: number; public opportunityiddesc: string; public calliddesc: string; public callid: number; public agenda: string; public campaignid: number; public campaigniddesc: string; public leadby: number; public leadbydesc: string; public currentowner: number; public currentownerdesc: string; public activitytype: string; public activitytypedesc: string; public attendedusers: string; public clientusers: string; public nextcalldate: Date; public nextaction: string; public nextactiondesc: string; public actiondatetime: Date; public score: number; public remarks: string; public attachment: string; public customfield: string; public status: string; public Deleted_lmstask_IDs: string; public Deleted_lmsreminder_IDs: string; public Deleted_lmshistory_IDs: string;
    constructor() { }
}
export interface IlmscallResponse {
    total: number;
    results: lmscall[];
}

