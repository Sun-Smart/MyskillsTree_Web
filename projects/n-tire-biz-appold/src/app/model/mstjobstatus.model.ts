export class mstjobstatus {
    public viewiddesc: string; public viewid: number; public applicantid: number; public applicantiddesc: string; public corporateid: number; public corporateiddesc: string; public viewdatetime: Date; public intereststatus: boolean; public comments: string; public allcomments: string; public jobid: number; public jobiddesc: string; public hiringstatus: boolean; public ctcoffered: string; public status: string;
    constructor() { }
}
export interface ImstjobstatusResponse {
    total: number;
    results: mstjobstatus[];
}

