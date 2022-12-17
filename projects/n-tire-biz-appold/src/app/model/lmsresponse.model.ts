export class lmsresponse {
    public responseiddesc: string; public responseid: number; public productgroupid: number; public productgroupiddesc: string; public baseresponse: string; public baseresponsedesc: string; public customresponse: string; public counter: number; public movetotrash: boolean; public workflowrole: number; public workflowroledesc: string; public colorcode: string; public colorcodedesc: string; public tathours: string; public status: string; public Deleted_lmssubresponse_IDs: string;
    constructor() { }
}
export interface IlmsresponseResponse {
    total: number;
    results: lmsresponse[];
}

