export class boteam {
    public teamiddesc: string; public teamid: number; public managerid: number; public manageriddesc: string; public description: string; public remarks: string; public status: string; public Deleted_boteammember_IDs: string;
    constructor() { }
}
export interface IboteamResponse {
    total: number;
    results: boteam[];
}

