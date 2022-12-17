export class prjtestplan {
    public projectid: number; public planiddesc: string; public planid: number; public parentid: number; public sequence: number; public details: string; public notes: string; public status: string; public DeletedprjtestcaseIDs: string;
    constructor() { }
}
export interface IprjtestplanResponse {
    total: number;
    results: prjtestplan[];
}

