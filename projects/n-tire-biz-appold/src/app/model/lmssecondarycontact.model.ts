export class lmssecondarycontact {
    public branchid: number; public branchiddesc: string; public leadid: number; public opportunityid: number; public opportunityiddesc: string; public secondarycontactiddesc: string; public secondarycontactid: number; public campaignid: number; public campaigniddesc: string; public secondarycontact: number; public status: string;
    constructor() { }
}
export interface IlmssecondarycontactResponse {
    total: number;
    results: lmssecondarycontact[];
}

