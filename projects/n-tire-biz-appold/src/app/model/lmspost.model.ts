export class lmspost {
    public postiddesc: string; public postid: number; public campaignid: number; public userid: number; public useriddesc: string; public senderemail: string; public scheduledate: Date; public scheduletime: string; public contenttext: string; public campaigntype: string; public campaigntypedesc: string; public recipientgroup: string; public testgroup: string; public sendunsubscribelink: boolean; public campaignstatus: string; public campaignstatusdesc: string; public attachment: string; public status: string;
    constructor() { }
}
export interface IlmspostResponse {
    total: number;
    results: lmspost[];
}

