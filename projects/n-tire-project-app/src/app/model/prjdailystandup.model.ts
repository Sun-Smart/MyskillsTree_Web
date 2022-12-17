export class prjdailystandup {
    public standupiddesc: string; public standupid: number; public projectid: number; public currentdate: Date; public status: string; public DeletedprjdailystandupdetailIDs: string;
    constructor() { }
}
export interface IprjdailystandupResponse {
    total: number;
    results: prjdailystandup[];
}

