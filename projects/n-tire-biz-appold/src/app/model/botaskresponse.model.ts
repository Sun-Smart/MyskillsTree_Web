export class botaskresponse {
    public responseiddesc: string; public responseid: number; public taskid: number; public responsedetail: string; public customfield: string; public attachment: string; public status: string;
    constructor() { }
}
export interface IbotaskresponseResponse {
    total: number;
    results: botaskresponse[];
}

