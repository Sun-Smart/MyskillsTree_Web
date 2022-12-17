export class prjtestrundetail {
    public projectid: number; public testrundetailiddesc: string; public testrundetailid: number; public testrunid: number; public testcaseid: number; public parentid: number; public planid: number; public result: boolean; public details: string; public notes: string; public attachment: string; public status: string;
    constructor() { }
}
export interface IprjtestrundetailResponse {
    total: number;
    results: prjtestrundetail[];
}

