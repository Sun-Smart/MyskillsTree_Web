export class lmscampaignlocation {
    public productid: number; public campaignid: number; public locationiddesc: string; public locationid: number; public locationname: string; public responsibilityid: number; public responsibilityiddesc: string; public validfrom: Date; public validto: Date; public customfield: string; public attachment: string; public status: string;
    constructor() { }
}
export interface IlmscampaignlocationResponse {
    total: number;
    results: lmscampaignlocation[];
}

