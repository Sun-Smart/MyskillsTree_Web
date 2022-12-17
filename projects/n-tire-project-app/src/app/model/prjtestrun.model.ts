export class prjtestrun {
    public projectid: number; public testruniddesc: string; public testrunid: number; public rundate: Date; public userid: number; public useriddesc: string; public details: string; public notes: string; public attachment: string; public status: string; public DeletedprjtestrundetailIDs: string;
    constructor() { }
}
export interface IprjtestrunResponse {
    total: number;
    results: prjtestrun[];
}

