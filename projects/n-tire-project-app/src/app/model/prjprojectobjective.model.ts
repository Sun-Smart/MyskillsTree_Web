export class prjprojectobjective {
    public projectid: number; public objectiveiddesc: string; public objectiveid: number; public objectivename: string; public target: string; public targetdate: Date; public owner: string; public currentstatus: string; public currentstatusdesc: string; public nextsteps: string; public notes: string; public sequence: number; public customfield: string; public attachment: string; public status: string;
    constructor() { }
}
export interface IprjprojectobjectiveResponse {
    total: number;
    results: prjprojectobjective[];
}

