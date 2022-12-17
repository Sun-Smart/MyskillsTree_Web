export class prjtimecard {
    public timecardiddesc: string; public timecardid: number; public projectid: number; public projectiddesc: string; public deliverableid: number; public deliverableiddesc: string; public taskid: number; public taskiddesc: string; public userid: number; public useriddesc: string; public carddate: Date; public fromtime: string; public totime: string; public hoursspent: string; public notes: string; public isbillable: boolean; public billablehrs: string; public billableamount: number; public billid: number; public customfield: string; public attachment: string; public status: string;
    constructor() { }
}
export interface IprjtimecardResponse {
    total: number;
    results: prjtimecard[];
}

