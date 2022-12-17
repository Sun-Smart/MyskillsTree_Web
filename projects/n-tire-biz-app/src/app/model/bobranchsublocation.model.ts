export class bobranchsublocation {
    public branchid: number; public sublocationiddesc: string; public sublocationid: number; public locationid: number; public locationiddesc: string; public locationname: string; public status: string;
    constructor() { }
}
export interface IbobranchsublocationResponse {
    total: number;
    results: bobranchsublocation[];
}

