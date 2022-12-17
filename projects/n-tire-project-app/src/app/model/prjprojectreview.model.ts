export class prjprojectreview {
    public projectid: number; public reviewiddesc: string; public reviewid: number; public review: string; public reviewstage: string; public reviewby: number; public verifiedby: number; public reviewdate: Date; public reviewresult: string; public remarks: string; public customfield: string; public attachment: string; public status: string;
    constructor() { }
}
export interface IprjprojectreviewResponse {
    total: number;
    results: prjprojectreview[];
}

