export class prjtestcase {
    public projectid: number; public testcaseiddesc: string; public testcaseid: number; public parentid: number; public planid: number; public details: string; public notes: string; public status: string;
    constructor() { }
}
export interface IprjtestcaseResponse {
    total: number;
    results: prjtestcase[];
}

