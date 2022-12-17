export class lmssubresponse {
    public productgroupid: number; public responseid: number; public baseresponse: string; public subresponseiddesc: string; public subresponseid: number; public subresponse: string; public status: string;
    constructor() { }
}
export interface IlmssubresponseResponse {
    total: number;
    results: lmssubresponse[];
}

