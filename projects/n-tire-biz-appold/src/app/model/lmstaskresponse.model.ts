export class lmstaskresponse {
    public productid: number; public leadid: number; public opportunityid: number; public opportunityiddesc: string; public taskid: number; public responseiddesc: string; public responseid: number; public responsedetail: string; public customfield: string; public attachment: string; public status: string;
    constructor() { }
}
export interface IlmstaskresponseResponse {
    total: number;
    results: lmstaskresponse[];
}

